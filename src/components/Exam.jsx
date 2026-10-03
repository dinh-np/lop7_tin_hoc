import { useState, useEffect, useCallback } from 'react';
import { getQuestionsForSubject } from '../data/questionBank';
import { ShortEssayQuestion } from './QuestionRenderer';
import SplitView from './SplitView';
import { saveSubmission, saveWrongAnswers, isFirebaseConfigured } from '../lib/firebase';
import { batchDiagnose, isGeminiConfigured } from '../lib/gemini';

const shuffle = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const EXAM_COUNT = 30;
const DEFAULT_EXAM_DURATION = 45 * 60;

// examId: thi theo đúng 1 đề (Ngữ văn) — giữ nguyên thứ tự, không bốc ngẫu nhiên
export default function Exam({ subjectId, part = 'all', examId = null, durationMinutes = null }) {
  const EXAM_DURATION = durationMinutes ? durationMinutes * 60 : DEFAULT_EXAM_DURATION;
  const allQuestions = getQuestionsForSubject(subjectId, part).filter((q) => !examId || q.examId === examId);

  const [examQuestions, setExamQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentIdx, setCurrentIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(EXAM_DURATION);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [wrongDetails, setWrongDetails] = useState([]);
  const [aiAnalyses, setAiAnalyses] = useState({});
  const [aiLoading, setAiLoading] = useState(false);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    if (examId) {
      setExamQuestions(allQuestions);
      return;
    }
    const count = Math.min(EXAM_COUNT, allQuestions.length);
    setExamQuestions(shuffle(allQuestions).slice(0, count));
  }, [allQuestions.length]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = useCallback(async () => {
    if (submitted) return;
    setSubmitted(true);

    let correct = 0;
    const wrongs = [];
    const wrongIds = [];

    examQuestions.forEach((q, idx) => {
      const isEssay = q.type === 'short_essay';
      // Tự luận: đúng khi HS tự đánh giá "đã nắm được"
      const isCorrect = isEssay ? answers[idx] === 'mastered' : answers[idx] === q.answer;
      if (isCorrect) {
        correct += 1;
      } else {
        wrongs.push({ question: q, studentAnswer: typeof answers[idx] === 'number' ? answers[idx] : -1 });
        wrongIds.push(q.id);
      }
    });

    const finalScore = examQuestions.length > 0 ? (correct / examQuestions.length) * 10 : 0;
    setScore(finalScore);
    setWrongDetails(wrongs);

    // Lưu vào localStorage (per subject)
    if (wrongIds.length > 0) {
      const key = `wrongQ_${subjectId}`;
      const stored = JSON.parse(localStorage.getItem(key) || '[]');
      localStorage.setItem(key, JSON.stringify([...new Set([...stored, ...wrongIds])]));
    }

    // Lưu vào Firebase Firestore (fire and forget — offline-safe)
    const durationSeconds = Math.round((Date.now() - startTime) / 1000);
    if (isFirebaseConfigured) {
      try {
        const submissionId = await saveSubmission({
          subject: subjectId,
          mode: 'exam',
          score: parseFloat(finalScore.toFixed(2)),
          correctCount: correct,
          wrongCount: wrongs.length,
          durationSeconds,
        });
        // Lưu chi tiết câu sai (tối đa 20 câu)
        if (submissionId && wrongs.length > 0) {
          await saveWrongAnswers(submissionId, wrongs.slice(0, 20));
        }
      } catch (e) {
        console.error('[Exam] Firebase save error:', e);
      }
    }

    // Phân tích AI Gemini
    const mcWrongs = wrongs.filter((w) => Array.isArray(w.question.options));
    if (isGeminiConfigured && mcWrongs.length > 0) {
      setAiLoading(true);
      try {
        const analyses = await batchDiagnose(mcWrongs.slice(0, 5));
        setAiAnalyses(analyses);
      } catch (e) {
        console.error('[Exam] AI analysis failed:', e);
      } finally {
        setAiLoading(false);
      }
    }
  }, [submitted, examQuestions, answers, subjectId, startTime]);

  // Timer
  useEffect(() => {
    if (submitted || timeLeft <= 0) {
      if (timeLeft <= 0 && !submitted) handleSubmit();
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, submitted, handleSubmit]);

  // ─── Keyboard shortcuts: 1-4 hoặc A-D để chọn đáp án, ←→ để chuyển câu ──
  useEffect(() => {
    if (submitted) return;

    const handleKey = (e) => {
      const tag = e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      const keyMap = { '1': 0, 'a': 0, '2': 1, 'b': 1, '3': 2, 'c': 2, '4': 3, 'd': 3 };
      const key = e.key.toLowerCase();

      if (key in keyMap && examQuestions[currentIdx] && examQuestions[currentIdx].type !== 'short_essay') {
        e.preventDefault();
        setAnswers((prev) => ({ ...prev, [currentIdx]: keyMap[key] }));
      } else if (key === 'arrowleft' || key === 'arrowup') {
        e.preventDefault();
        setCurrentIdx((i) => Math.max(0, i - 1));
      } else if (key === 'arrowright' || key === 'arrowdown') {
        e.preventDefault();
        setCurrentIdx((i) => Math.min(examQuestions.length - 1, i + 1));
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [submitted, currentIdx, examQuestions]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  if (allQuestions.length === 0) {
    return (
      <div className="card empty-state">
        <div className="empty-icon">🚧</div>
        <div className="empty-title">Chưa có câu hỏi để thi</div>
        <div className="empty-desc">Ngân hàng câu hỏi đang được chuẩn bị.</div>
      </div>
    );
  }

  if (examQuestions.length === 0) return <div className="card">Đang tạo đề thi...</div>;

  // ─── RESULTS SCREEN ─────────────────────────────────────────────────────
  if (submitted) {
    const pass = score >= 5;
    const answered = Object.keys(answers).length;

    return (
      <div>
        <div className="card result-card">
          <h2 style={{ marginBottom: 20 }}>Kết Quả Thi Thử</h2>

          <div className={`score-circle ${pass ? 'pass' : 'fail'}`}>
            <span className="score-number">{score.toFixed(1)}</span>
            <span className="score-label">/ 10</span>
          </div>

          <p style={{ fontSize: '1.1rem', fontWeight: 700, color: pass ? 'var(--success)' : 'var(--danger)', marginBottom: 4 }}>
            {pass ? '🎉 Đạt yêu cầu!' : '💪 Cần cố gắng thêm!'}
          </p>

          <div className="result-stats">
            <div className="stat-item">
              <div className="stat-value" style={{ color: 'var(--success)' }}>
                {examQuestions.length - wrongDetails.length}
              </div>
              <div className="stat-label">Đúng</div>
            </div>
            <div className="stat-item">
              <div className="stat-value" style={{ color: 'var(--danger)' }}>
                {wrongDetails.length}
              </div>
              <div className="stat-label">Sai</div>
            </div>
            <div className="stat-item">
              <div className="stat-value" style={{ color: 'var(--text-3)' }}>
                {examQuestions.length - answered}
              </div>
              <div className="stat-label">Bỏ trống</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">
                {formatTime(EXAM_DURATION - Math.max(0, timeLeft))}
              </div>
              <div className="stat-label">Thời gian</div>
            </div>
          </div>

          {isFirebaseConfigured && (
            <p style={{ fontSize: '0.8rem', color: 'var(--text-3)', marginBottom: 8 }}>
              ☁️ Kết quả đã được lưu lên Firebase
            </p>
          )}

          <button className="btn-primary" onClick={() => window.location.reload()} style={{ marginTop: 8 }}>
            🔄 Thi Lại
          </button>
        </div>

        {/* AI Analysis */}
        {wrongDetails.length > 0 && (
          <div className="card">
            <div className="card-title">
              <span>🤖 Phân tích AI – Câu làm sai</span>
              {aiLoading && <span className="ai-loading"><span className="spinner" /> Đang phân tích...</span>}
            </div>

            {wrongDetails.slice(0, 5).map(({ question, studentAnswer }, idx) => (
              <div key={question.id} style={{ marginBottom: 24, paddingBottom: 20, borderBottom: idx < Math.min(wrongDetails.length, 5) - 1 ? '1px solid var(--border)' : 'none' }}>
                <div className="question-meta" style={{ marginBottom: 8 }}>
                  <span style={{ fontWeight: 700, color: 'var(--danger)' }}>Câu sai #{idx + 1}</span>
                  <span className="tag topic">{question.topic}</span>
                </div>
                <p style={{ fontWeight: 600, marginBottom: 8, fontSize: '0.95rem' }}>{question.question}</p>
                {Array.isArray(question.options) ? (
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
                    <span style={{ padding: '4px 12px', borderRadius: 99, background: 'var(--danger-light)', color: 'var(--danger)', fontSize: '0.82rem', fontWeight: 600 }}>
                      ✗ {studentAnswer >= 0 ? question.options[studentAnswer] : 'Bỏ trống'}
                    </span>
                    <span style={{ padding: '4px 12px', borderRadius: 99, background: 'var(--success-light)', color: 'var(--success)', fontSize: '0.82rem', fontWeight: 600 }}>
                      ✓ {question.options[question.answer]}
                    </span>
                  </div>
                ) : (
                  <div className="explanation" style={{ marginBottom: 10, whiteSpace: 'pre-wrap' }}>
                    <strong>📝 Đáp án mẫu:</strong> {question.modelAnswer || question.explanation}
                  </div>
                )}
                <div className="explanation">
                  <strong>Giải thích:</strong> {question.explanation}
                </div>

                {isGeminiConfigured && Array.isArray(question.options) && (
                  <div className="ai-panel">
                    <div className="ai-panel-header">✨ Gemini AI phân tích</div>
                    {aiLoading && !aiAnalyses[question.id] ? (
                      <div className="ai-loading"><span className="spinner" /> Đang phân tích câu này...</div>
                    ) : aiAnalyses[question.id] ? (
                      <div className="ai-panel-content">{aiAnalyses[question.id]}</div>
                    ) : null}
                  </div>
                )}
              </div>
            ))}

            {wrongDetails.length > 5 && (
              <p style={{ textAlign: 'center', color: 'var(--text-3)', fontSize: '0.88rem' }}>
                (Hiển thị 5/{wrongDetails.length} câu sai. Xem thêm trong "Sổ Tay Ôn Lại")
              </p>
            )}
          </div>
        )}
      </div>
    );
  }

  // ─── EXAM SCREEN ──────────────────────────────────────────────────────────
  const currentQuestion = examQuestions[currentIdx];
  if (!currentQuestion) return <div className="card">Đang tải câu hỏi...</div>;
  const timerCls = timeLeft <= 60 ? 'timer danger' : timeLeft <= 300 ? 'timer warning' : 'timer';

  // Palette component dùng chung
  const PaletteButtons = () => (
    <>
      {examQuestions.map((_, idx) => (
        <button
          key={idx}
          id={`palette-btn-${idx}`}
          className={`palette-btn ${currentIdx === idx ? 'active' : ''} ${answers[idx] !== undefined ? 'answered' : ''}`}
          onClick={() => setCurrentIdx(idx)}
        >
          {idx + 1}
        </button>
      ))}
    </>
  );

  return (
    <div className="exam-split">
      {/* ─── LEFT: Question panel ─── */}
      <div className="card" style={{ marginBottom: 0 }}>
        {/* Mobile: scrollable palette */}
        <div className="palette-scroll no-select">
          <PaletteButtons />
        </div>

        <div className="card-title">
          <span>Thi Thử ({Math.ceil(EXAM_DURATION / 60)} Phút)</span>
          {/* Timer visible on mobile */}
          <div className={`${timerCls} md-hidden`} style={{ display: 'flex' }}>⏱ {formatTime(timeLeft)}</div>
        </div>

        {/* Desktop palette */}
        <div className="palette-grid no-select">
          <PaletteButtons />
        </div>

        <hr />

        <div className="question-meta" style={{ marginBottom: 10 }}>
          <span style={{ fontWeight: 700, color: 'var(--text-2)', fontSize: '0.88rem' }}>
            Câu {currentIdx + 1} / {examQuestions.length}
          </span>
          <span className="tag topic">{currentQuestion.topic}</span>
        </div>

        <SplitView passage={currentQuestion.passage}>
        <p className="question-text">{currentQuestion.question}</p>
        {currentQuestion.image && (
          <img src={currentQuestion.image} alt="Hình minh họa" className="question-img" />
        )}

        {currentQuestion.type === 'short_essay' || !Array.isArray(currentQuestion.options) ? (
          <ShortEssayQuestion
            key={currentQuestion.id}
            question={currentQuestion}
            subjectId={subjectId}
            onAnswer={(val) => setAnswers((prev) => ({ ...prev, [currentIdx]: val }))}
          />
        ) : (
        <div className="options-list">
          {currentQuestion.options.map((opt, idx) => (
            <button
              key={idx}
              id={`option-${idx}`}
              className={`option-btn ${answers[currentIdx] === idx ? 'correct' : ''}`}
              style={answers[currentIdx] === idx ? { background: 'var(--primary-light)', borderColor: 'var(--primary)', color: 'var(--primary-dark)' } : {}}
              onClick={() => setAnswers((prev) => ({ ...prev, [currentIdx]: idx }))}
            >
              <span style={{ fontWeight: 700, marginRight: 8, color: 'var(--text-3)' }}>
                {['A', 'B', 'C', 'D'][idx]}.
              </span>
              {opt}
            </button>
          ))}
        </div>
        )}

        {/* Keyboard hint (desktop only) */}
        <div className="kbd-hint">
          <span>Phím tắt:</span>
          {['A','B','C','D'].map((k) => <kbd key={k} className="kbd">{k}</kbd>)}
          <span style={{ marginLeft: 8 }}>hoặc</span>
          {['1','2','3','4'].map((k) => <kbd key={k} className="kbd">{k}</kbd>)}
          <span style={{ marginLeft: 8 }}>|</span>
          <kbd className="kbd">←</kbd><kbd className="kbd">→</kbd>
          <span>chuyển câu</span>
        </div>

        <div className="flex-between" style={{ marginTop: 24 }}>
          <button className="btn-outline" onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))} disabled={currentIdx === 0}>
            ← Câu trước
          </button>
          {currentIdx === examQuestions.length - 1 ? (
            <button className="btn-danger" id="submit-exam-btn" onClick={handleSubmit}>
              📤 Nộp Bài
            </button>
          ) : (
            <button className="btn-primary" onClick={() => setCurrentIdx(Math.min(examQuestions.length - 1, currentIdx + 1))}>
              Câu tiếp →
            </button>
          )}
        </div>
        </SplitView>
      </div>

      {/* ─── RIGHT: Sidebar (timer + palette) – tablet/desktop only ─── */}
      <div className="exam-sidebar">
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-3)', fontWeight: 600, marginBottom: 4 }}>THỜI GIAN CÒN LẠI</div>
          <div className={timerCls} style={{ fontSize: '1.8rem' }}>⏱ {formatTime(timeLeft)}</div>
        </div>

        <div style={{ fontSize: '0.75rem', color: 'var(--text-3)', fontWeight: 600, marginBottom: 8 }}>
          BẢNG CÂU HỎI ({Object.keys(answers).length}/{examQuestions.length} đã trả lời)
        </div>
        <div className="palette-grid" style={{ marginBottom: 16 }}>
          <PaletteButtons />
        </div>

        <button className="btn-danger" id="submit-exam-btn-sidebar" onClick={handleSubmit} style={{ width: '100%' }}>
          📤 Nộp Bài
        </button>
      </div>
    </div>
  );
}

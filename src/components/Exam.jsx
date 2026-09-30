import { useState, useEffect, useCallback } from 'react';
import { getQuestionsForSubject } from '../data/questionBank';
import { saveSession } from '../lib/supabase';
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
const EXAM_DURATION = 45 * 60;

export default function Exam({ subjectId }) {
  const allQuestions = getQuestionsForSubject(subjectId);

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
    const count = Math.min(EXAM_COUNT, allQuestions.length);
    setExamQuestions(shuffle(allQuestions).slice(0, count));
  }, [allQuestions.length]);

  const handleSubmit = useCallback(async () => {
    if (submitted) return;
    setSubmitted(true);

    let correct = 0;
    const wrongs = [];
    const wrongIds = [];

    examQuestions.forEach((q, idx) => {
      if (answers[idx] === q.answer) {
        correct += 1;
      } else {
        wrongs.push({ question: q, studentAnswer: answers[idx] ?? -1 });
        wrongIds.push(q.id);
      }
    });

    const finalScore = examQuestions.length > 0 ? (correct / examQuestions.length) * 10 : 0;
    setScore(finalScore);
    setWrongDetails(wrongs);

    // Save to localStorage (per subject)
    if (wrongIds.length > 0) {
      const key = `wrongQ_${subjectId}`;
      const stored = JSON.parse(localStorage.getItem(key) || '[]');
      localStorage.setItem(key, JSON.stringify([...new Set([...stored, ...wrongIds])]));
    }

    // Save to Supabase (fire and forget)
    const durationSeconds = Math.round((Date.now() - startTime) / 1000);
    saveSession({
      subject: subjectId,
      mode: 'exam',
      score: parseFloat(finalScore.toFixed(2)),
      totalQuestions: examQuestions.length,
      correctCount: correct,
      wrongIds,
      durationSeconds,
    });

    // Load Gemini AI analysis
    if (isGeminiConfigured && wrongs.length > 0) {
      setAiLoading(true);
      try {
        const analyses = await batchDiagnose(wrongs.slice(0, 5)); // max 5 for speed
        setAiAnalyses(analyses);
      } catch (e) {
        console.error('AI analysis failed:', e);
      } finally {
        setAiLoading(false);
      }
    }
  }, [submitted, examQuestions, answers, subjectId, startTime]);

  useEffect(() => {
    if (submitted || timeLeft <= 0) {
      if (timeLeft <= 0 && !submitted) handleSubmit();
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, submitted, handleSubmit]);

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

          <button className="btn-primary" onClick={() => window.location.reload()} style={{ marginTop: 8 }}>
            🔄 Thi Lại
          </button>
        </div>

        {/* AI Analysis of wrong answers */}
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
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
                  <span style={{ padding: '4px 12px', borderRadius: 99, background: 'var(--danger-light)', color: 'var(--danger)', fontSize: '0.82rem', fontWeight: 600 }}>
                    ✗ {studentAnswer >= 0 ? question.options[studentAnswer] : 'Bỏ trống'}
                  </span>
                  <span style={{ padding: '4px 12px', borderRadius: 99, background: 'var(--success-light)', color: 'var(--success)', fontSize: '0.82rem', fontWeight: 600 }}>
                    ✓ {question.options[question.answer]}
                  </span>
                </div>
                <div className="explanation" style={{ marginTop: 0, marginBottom: 10 }}>
                  <strong>Giải thích:</strong> {question.explanation}
                </div>

                {/* Gemini AI Analysis */}
                {isGeminiConfigured && (
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
  const timerCls = timeLeft <= 60 ? 'timer danger' : timeLeft <= 300 ? 'timer warning' : 'timer';

  return (
    <div className="card">
      {/* Header */}
      <div className="card-title">
        <span>Thi Thử ({Math.ceil(EXAM_DURATION / 60)} Phút)</span>
        <div className={timerCls}>⏱ {formatTime(timeLeft)}</div>
      </div>

      {/* Answer palette */}
      <div className="palette-grid">
        {examQuestions.map((_, idx) => (
          <button
            key={idx}
            className={`palette-btn ${currentIdx === idx ? 'active' : ''} ${answers[idx] !== undefined ? 'answered' : ''}`}
            onClick={() => setCurrentIdx(idx)}
          >
            {idx + 1}
          </button>
        ))}
      </div>

      <hr />

      {/* Question */}
      <div className="question-meta" style={{ marginBottom: 10 }}>
        <span style={{ fontWeight: 700, color: 'var(--text-2)', fontSize: '0.88rem' }}>
          Câu {currentIdx + 1} / {examQuestions.length}
        </span>
        <span className="tag topic">{currentQuestion.topic}</span>
      </div>

      <p className="question-text">{currentQuestion.question}</p>

      <div className="options-list">
        {currentQuestion.options.map((opt, idx) => (
          <button
            key={idx}
            className={`option-btn ${answers[currentIdx] === idx ? 'correct' : ''}`}
            style={answers[currentIdx] === idx ? { background: 'var(--primary-light)', borderColor: 'var(--primary)', color: 'var(--primary-dark)' } : {}}
            onClick={() => setAnswers((prev) => ({ ...prev, [currentIdx]: idx }))}
          >
            {opt}
          </button>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex-between" style={{ marginTop: 24 }}>
        <button className="btn-outline" onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))} disabled={currentIdx === 0}>
          ← Câu trước
        </button>
        {currentIdx === examQuestions.length - 1 ? (
          <button className="btn-danger" onClick={handleSubmit}>
            📤 Nộp Bài
          </button>
        ) : (
          <button className="btn-primary" onClick={() => setCurrentIdx(Math.min(examQuestions.length - 1, currentIdx + 1))}>
            Câu tiếp →
          </button>
        )}
      </div>
    </div>
  );
}

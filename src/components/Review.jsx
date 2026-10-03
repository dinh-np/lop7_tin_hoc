import { useState, useEffect, useMemo } from 'react';
import { getQuestionsForSubject } from '../data/questionBank';
import { ShortEssayQuestion } from './QuestionRenderer';
import PassagePanel from './PassagePanel';

export default function Review({ subjectId, part = 'all' }) {
  const allQuestions = getQuestionsForSubject(subjectId, part);
  const storageKey = `wrongQ_${subjectId}`;

  const [incorrectIds, setIncorrectIds] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(storageKey) || '[]');
    setIncorrectIds(stored);
  }, [storageKey]);

  const reviewQuestions = useMemo(
    () => allQuestions.filter((q) => incorrectIds.includes(q.id)),
    [incorrectIds, allQuestions]
  );

  const currentQuestion = reviewQuestions[currentIdx];

  const handleAnswer = (idx) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(idx);

    if (idx === currentQuestion.answer) {
      const newIds = incorrectIds.filter((id) => id !== currentQuestion.id);
      localStorage.setItem(storageKey, JSON.stringify(newIds));
    }
  };

  const nextQuestion = () => {
    if (selectedAnswer !== null && selectedAnswer === currentQuestion.answer) {
      const stored = JSON.parse(localStorage.getItem(storageKey) || '[]');
      setIncorrectIds(stored);
      if (currentIdx >= stored.length) {
        setCurrentIdx(Math.max(0, stored.length - 1));
      }
    } else {
      if (currentIdx < reviewQuestions.length - 1) {
        setCurrentIdx(currentIdx + 1);
      }
    }
    setSelectedAnswer(null);
  };

  const clearAll = () => {
    if (window.confirm('Xóa toàn bộ danh sách câu hỏi cần ôn?')) {
      localStorage.setItem(storageKey, '[]');
      setIncorrectIds([]);
    }
  };

  if (incorrectIds.length === 0) {
    return (
      <div className="card empty-state">
        <div className="empty-icon">🌟</div>
        <div className="empty-title" style={{ color: 'var(--success)' }}>
          Tuyệt vời! Không có câu cần ôn
        </div>
        <div className="empty-desc">
          Hãy luyện tập hoặc thi thử để theo dõi câu làm sai.
        </div>
      </div>
    );
  }

  if (!currentQuestion) return null;

  const progress = ((currentIdx + 1) / reviewQuestions.length) * 100;

  return (
    <div className="card">
      {/* Header */}
      <div className="card-title">
        <span>📖 Sổ Tay Ôn Lại</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="wrong-count-badge">{reviewQuestions.length} câu</span>
          <button className="btn-ghost" onClick={clearAll} style={{ padding: '5px 10px', fontSize: '0.78rem' }}>
            Xóa tất cả
          </button>
        </div>
      </div>

      {/* Progress */}
      <div className="progress-bar-wrap">
        <div className="progress-bar-fill" style={{ width: `${progress}%`, background: 'linear-gradient(90deg, var(--danger), var(--warning))' }} />
      </div>

      {/* Question meta */}
      <div className="question-meta">
        <span style={{ fontWeight: 600, color: 'var(--text-2)', fontSize: '0.88rem' }}>
          Câu {currentIdx + 1} / {reviewQuestions.length}
        </span>
        <span className="tag topic">{currentQuestion.topic}</span>
      </div>

      <PassagePanel passage={currentQuestion.passage} />

      <p className="question-text">{currentQuestion.question}</p>
      {currentQuestion.image && (
        <img src={currentQuestion.image} alt="Hình minh họa" className="question-img" />
      )}

      {currentQuestion.type === 'short_essay' || !Array.isArray(currentQuestion.options) ? (
        <ShortEssayQuestion
          key={currentQuestion.id}
          question={currentQuestion}
          subjectId={subjectId}
          onAnswer={(val, ok) => {
            setSelectedAnswer(val);
            if (ok) {
              const stored = JSON.parse(localStorage.getItem(storageKey) || '[]');
              localStorage.setItem(storageKey, JSON.stringify(stored.filter((id) => id !== currentQuestion.id)));
            }
          }}
        />
      ) : (
      <div className="options-list">
        {currentQuestion.options.map((opt, idx) => {
          let cls = 'option-btn';
          if (selectedAnswer !== null) {
            if (idx === currentQuestion.answer) cls += ' correct';
            else if (idx === selectedAnswer) cls += ' incorrect';
          }
          return (
            <button
              key={idx}
              className={cls}
              onClick={() => handleAnswer(idx)}
              disabled={selectedAnswer !== null}
            >
              {opt}
            </button>
          );
        })}
      </div>
      )}

      {selectedAnswer !== null && (
        <div className="explanation">
          <strong>Giải thích:</strong> {currentQuestion.explanation}
        </div>
      )}

      <div style={{ marginTop: 20, textAlign: 'right' }}>
        <button className="btn-primary" onClick={nextQuestion} disabled={selectedAnswer === null}>
          {selectedAnswer === currentQuestion.answer ? '✅ Đã hiểu, sang câu tiếp' : '⏭ Ôn lại sau'}
        </button>
      </div>
    </div>
  );
}

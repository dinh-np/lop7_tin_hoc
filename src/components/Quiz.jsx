import { useState, useMemo } from 'react';
import { getQuestionsForSubject } from '../data/questionBank';
import { ShortEssayQuestion } from './QuestionRenderer';

export default function Quiz({ subjectId, part = 'all' }) {
  const questions = getQuestionsForSubject(subjectId, part);
  const topics = useMemo(
    () => ['Tất cả', ...new Set(questions.map((q) => q.topic))],
    [questions]
  );

  const [selectedTopic, setSelectedTopic] = useState('Tất cả');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const filteredQuestions = useMemo(() => {
    if (selectedTopic === 'Tất cả') return questions;
    return questions.filter((q) => q.topic === selectedTopic);
  }, [selectedTopic, questions]);

  const currentQuestion = filteredQuestions[currentIdx];

  const handleTopicChange = (e) => {
    setSelectedTopic(e.target.value);
    setCurrentIdx(0);
    setSelectedAnswer(null);
  };

  const handleAnswer = (idx) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(idx);

    if (idx !== currentQuestion.answer) {
      const key = `wrongQ_${subjectId}`;
      const stored = JSON.parse(localStorage.getItem(key) || '[]');
      if (!stored.includes(currentQuestion.id)) {
        localStorage.setItem(key, JSON.stringify([...stored, currentQuestion.id]));
      }
    }
  };

  const nextQuestion = () => {
    if (currentIdx < filteredQuestions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedAnswer(null);
    }
  };

  const prevQuestion = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
      setSelectedAnswer(null);
    }
  };

  if (questions.length === 0) {
    return (
      <div className="card empty-state">
        <div className="empty-icon">🚧</div>
        <div className="empty-title">Chưa có câu hỏi</div>
        <div className="empty-desc">Ngân hàng câu hỏi cho môn này đang được chuẩn bị.</div>
      </div>
    );
  }

  if (!currentQuestion) return null;

  const progress = ((currentIdx + 1) / filteredQuestions.length) * 100;

  return (
    <div className="card">
      {/* Header */}
      <div className="card-title">
        <span>Luyện Tập</span>
        <select value={selectedTopic} onChange={handleTopicChange}>
          {topics.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* Progress */}
      <div className="progress-bar-wrap">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* Question meta */}
      <div className="question-meta">
        <span style={{ fontWeight: 600, color: 'var(--text-2)', fontSize: '0.88rem' }}>
          Câu {currentIdx + 1} / {filteredQuestions.length}
        </span>
        <span className="tag topic">{currentQuestion.topic}</span>
        {currentQuestion.skill && (
          <span className="tag skill">{currentQuestion.skill}</span>
        )}
      </div>

      {/* Question */}
      <p className="question-text">{currentQuestion.question}</p>

      {/* Options */}
      {currentQuestion.type === 'short_essay' || !Array.isArray(currentQuestion.options) ? (
        <ShortEssayQuestion key={currentQuestion.id} question={currentQuestion} subjectId={subjectId} />
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

      {/* Explanation */}
      {selectedAnswer !== null && (
        <div className="explanation">
          <strong>Giải thích:</strong> {currentQuestion.explanation}
        </div>
      )}

      {/* Navigation */}
      <div className="flex-between" style={{ marginTop: '20px' }}>
        <button
          className="btn-outline"
          onClick={prevQuestion}
          disabled={currentIdx === 0}
        >
          ← Câu trước
        </button>
        <button
          className="btn-primary"
          onClick={nextQuestion}
          disabled={currentIdx === filteredQuestions.length - 1}
        >
          Câu tiếp →
        </button>
      </div>
    </div>
  );
}

import { useState, useEffect, useMemo } from 'react';
import { questionBank } from '../data/questionBank';

export default function Review() {
  const [incorrectIds, setIncorrectIds] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('incorrectQuestions') || '[]');
    setIncorrectIds(stored);
  }, []);

  const reviewQuestions = useMemo(() => {
    return questionBank.filter(q => incorrectIds.includes(q.id));
  }, [incorrectIds]);

  const currentQuestion = reviewQuestions[currentIdx];

  const handleAnswer = (idx) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(idx);
    
    // If correct, remove from incorrect list after short delay or next click?
    // Let's do it immediately in storage, but keep it in view until they move next
    if (idx === currentQuestion.answer) {
      const newIds = incorrectIds.filter(id => id !== currentQuestion.id);
      localStorage.setItem('incorrectQuestions', JSON.stringify(newIds));
      // update state on next question? We'll let them see explanation first.
    }
  };

  const nextQuestion = () => {
    if (selectedAnswer !== null && selectedAnswer === currentQuestion.answer) {
      // It was removed from storage. We need to reload the ids from storage to reflect state.
      const stored = JSON.parse(localStorage.getItem('incorrectQuestions') || '[]');
      setIncorrectIds(stored);
      
      // If the list shrunk, we might need to adjust currentIdx if it's out of bounds
      if (currentIdx >= stored.length) {
        setCurrentIdx(Math.max(0, stored.length - 1));
      }
    } else {
      // Just move to next if not at end
      if (currentIdx < reviewQuestions.length - 1) {
        setCurrentIdx(currentIdx + 1);
      }
    }
    setSelectedAnswer(null);
  };

  if (incorrectIds.length === 0) {
    return (
      <div className="card" style={{ textAlign: 'center' }}>
        <h2>Sổ Tay Cần Ôn Lại</h2>
        <p style={{ color: 'var(--success-color)', fontSize: '1.2rem', fontWeight: 'bold' }}>
          Tuyệt vời! Bạn không có câu hỏi nào làm sai.
        </p>
      </div>
    );
  }

  if (!currentQuestion) return null;

  return (
    <div className="card">
      <div className="flex-between">
        <h2>Sổ Tay Cần Ôn Lại</h2>
        <span style={{ fontWeight: 'bold', color: 'var(--danger-color)' }}>
          Còn lại {reviewQuestions.length} câu
        </span>
      </div>

      <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>
        Câu hỏi (Chủ đề: {currentQuestion.topic}):
      </div>
      
      <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>{currentQuestion.question}</p>

      <div className="options-list">
        {currentQuestion.options.map((opt, idx) => {
          let btnClass = 'option-btn';
          if (selectedAnswer !== null) {
            if (idx === currentQuestion.answer) btnClass += ' correct';
            else if (idx === selectedAnswer) btnClass += ' incorrect';
          }

          return (
            <button 
              key={idx} 
              className={btnClass} 
              onClick={() => handleAnswer(idx)}
              disabled={selectedAnswer !== null}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {selectedAnswer !== null && (
        <div className="explanation">
          <strong>Giải thích:</strong> {currentQuestion.explanation}
        </div>
      )}

      <div style={{ marginTop: '20px', textAlign: 'right' }}>
        <button 
          className="btn-primary" 
          onClick={nextQuestion} 
          disabled={selectedAnswer === null}
        >
          {selectedAnswer === currentQuestion.answer ? 'Đã hiểu, sang câu khác' : 'Thử lại sau'}
        </button>
      </div>
    </div>
  );
}

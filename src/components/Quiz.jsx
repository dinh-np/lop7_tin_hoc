import { useState, useMemo } from 'react';
import { questionBank } from '../data/questionBank';

export default function Quiz() {
  const topics = ['Tất cả', ...new Set(questionBank.map(q => q.topic))];
  const [selectedTopic, setSelectedTopic] = useState('Tất cả');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const filteredQuestions = useMemo(() => {
    if (selectedTopic === 'Tất cả') return questionBank;
    return questionBank.filter(q => q.topic === selectedTopic);
  }, [selectedTopic]);

  const currentQuestion = filteredQuestions[currentIdx];

  const handleTopicChange = (e) => {
    setSelectedTopic(e.target.value);
    setCurrentIdx(0);
    setSelectedAnswer(null);
  };

  const handleAnswer = (idx) => {
    if (selectedAnswer !== null) return; // prevent changing answer
    setSelectedAnswer(idx);
    
    // Save to incorrect storage if wrong
    if (idx !== currentQuestion.answer) {
      const stored = JSON.parse(localStorage.getItem('incorrectQuestions') || '[]');
      if (!stored.includes(currentQuestion.id)) {
        localStorage.setItem('incorrectQuestions', JSON.stringify([...stored, currentQuestion.id]));
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

  if (!currentQuestion) return <div>Không có câu hỏi nào.</div>;

  return (
    <div className="card">
      <div className="flex-between">
        <h2>Luyện Tập</h2>
        <select value={selectedTopic} onChange={handleTopicChange}>
          {topics.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>
        Câu {currentIdx + 1} / {filteredQuestions.length}: {currentQuestion.topic}
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

      <div className="flex-between" style={{ marginTop: '20px' }}>
        <button className="btn-outline" onClick={prevQuestion} disabled={currentIdx === 0}>
          Câu trước
        </button>
        <button className="btn-primary" onClick={nextQuestion} disabled={currentIdx === filteredQuestions.length - 1}>
          Câu tiếp theo
        </button>
      </div>
    </div>
  );
}

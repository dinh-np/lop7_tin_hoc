import { useState, useEffect, useMemo } from 'react';
import { questionBank } from '../data/questionBank';

// Utility to shuffle array
const shuffle = (array) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};

export default function Exam() {
  const [examQuestions, setExamQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentIdx, setCurrentIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45 * 60); // 45 minutes in seconds
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Select 30 random questions
    const shuffled = shuffle([...questionBank]);
    setExamQuestions(shuffled.slice(0, 30));
  }, []);

  useEffect(() => {
    if (submitted) return;
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, submitted]);

  const handleAnswer = (idx) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [currentIdx]: idx }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    let correct = 0;
    const wrongIds = [];
    
    examQuestions.forEach((q, idx) => {
      if (answers[idx] === q.answer) {
        correct += 1;
      } else {
        wrongIds.push(q.id);
      }
    });

    setScore((correct / examQuestions.length) * 10);

    // Save wrongs to local storage
    if (wrongIds.length > 0) {
      const stored = JSON.parse(localStorage.getItem('incorrectQuestions') || '[]');
      const newWrongs = [...new Set([...stored, ...wrongIds])];
      localStorage.setItem('incorrectQuestions', JSON.stringify(newWrongs));
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  if (examQuestions.length === 0) return <div>Đang tạo đề...</div>;

  const currentQuestion = examQuestions[currentIdx];

  if (submitted) {
    return (
      <div className="card" style={{ textAlign: 'center' }}>
        <h2>Kết Quả Thi Thử</h2>
        <p style={{ fontSize: '2rem', color: score >= 5 ? 'var(--success-color)' : 'var(--danger-color)', fontWeight: 'bold' }}>
          Điểm: {score.toFixed(1)} / 10
        </p>
        <p>Thời gian làm bài: {formatTime(45 * 60 - Math.max(0, timeLeft))}</p>
        <p>{score >= 5 ? 'Chúc mừng bạn đã ĐẠT!' : 'Bạn cần cố gắng hơn nhé!'}</p>
        <button className="btn-primary" onClick={() => window.location.reload()} style={{ marginTop: '20px' }}>
          Thi Lại
        </button>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex-between">
        <h2>Thi Thử (45 Phút)</h2>
        <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--danger-color)' }}>
          ⏱ {formatTime(timeLeft)}
        </div>
      </div>

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

      <hr style={{ margin: '20px 0', borderColor: 'var(--border-color)', borderStyle: 'solid', borderWidth: '1px 0 0 0' }} />

      <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>
        Câu {currentIdx + 1}:
      </div>
      
      <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>{currentQuestion.question}</p>

      <div className="options-list">
        {currentQuestion.options.map((opt, idx) => (
          <button 
            key={idx} 
            className={`option-btn ${answers[currentIdx] === idx ? 'active' : ''}`}
            style={{ 
              backgroundColor: answers[currentIdx] === idx ? 'var(--primary-color)' : '',
              color: answers[currentIdx] === idx ? 'white' : ''
            }}
            onClick={() => handleAnswer(idx)}
          >
            {opt}
          </button>
        ))}
      </div>

      <div className="flex-between" style={{ marginTop: '30px' }}>
        <button className="btn-outline" onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))} disabled={currentIdx === 0}>
          Câu trước
        </button>
        
        {currentIdx === examQuestions.length - 1 ? (
          <button className="btn-primary" style={{ backgroundColor: 'var(--danger-color)' }} onClick={handleSubmit}>
            Nộp Bài
          </button>
        ) : (
          <button className="btn-primary" onClick={() => setCurrentIdx(Math.min(examQuestions.length - 1, currentIdx + 1))}>
            Câu tiếp theo
          </button>
        )}
      </div>
    </div>
  );
}

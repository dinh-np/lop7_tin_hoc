/**
 * QuestionRenderer — Render 3 loại câu hỏi:
 *  - multiple_choice (mặc định): A/B/C/D với feedback ngay
 *  - calculation: hiển thị lời giải từng bước toggle
 *  - short_essay: input text + reveal model answer + self-evaluation
 */
import { useState } from 'react';

export default function QuestionRenderer({ question, onAnswer, subjectId }) {
  const type = question.type || 'multiple_choice';

  if (type === 'calculation') {
    return <CalculationQuestion question={question} onAnswer={onAnswer} />;
  }

  if (type === 'short_essay') {
    return <ShortEssayQuestion question={question} onAnswer={onAnswer} subjectId={subjectId} />;
  }

  // Default: multiple_choice
  return <MultipleChoiceQuestion question={question} onAnswer={onAnswer} subjectId={subjectId} />;
}

// ─── Multiple Choice ────────────────────────────────────────────────────────
function MultipleChoiceQuestion({ question, onAnswer, subjectId }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswer = (idx) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(idx);

    // Lưu câu sai vào localStorage
    if (idx !== question.answer && subjectId) {
      const key = `wrongQ_${subjectId}`;
      const stored = JSON.parse(localStorage.getItem(key) || '[]');
      if (!stored.includes(question.id)) {
        localStorage.setItem(key, JSON.stringify([...stored, question.id]));
      }
    }

    if (onAnswer) onAnswer(idx, idx === question.answer);
  };

  const isCorrect = selectedAnswer === question.answer;

  return (
    <div>
      <div className="options-list">
        {question.options.map((opt, idx) => {
          let cls = 'option-btn';
          if (selectedAnswer !== null) {
            if (idx === question.answer) cls += ' correct';
            else if (idx === selectedAnswer) cls += ' incorrect';
          }
          return (
            <button
              key={idx}
              id={`mc-option-${question.id}-${idx}`}
              className={cls}
              onClick={() => handleAnswer(idx)}
              disabled={selectedAnswer !== null}
            >
              <span style={{ fontWeight: 700, marginRight: 8, color: 'var(--text-3)' }}>
                {['A', 'B', 'C', 'D'][idx]}.
              </span>
              {opt}
            </button>
          );
        })}
      </div>

      {selectedAnswer !== null && (
        <div className="explanation" style={{ borderLeftColor: isCorrect ? 'var(--success)' : 'var(--danger)' }}>
          <strong>{isCorrect ? '✅ Đúng rồi!' : '❌ Chưa đúng —'}</strong>{' '}
          {question.explanation}
        </div>
      )}
    </div>
  );
}

// ─── Calculation ─────────────────────────────────────────────────────────────
function CalculationQuestion({ question, onAnswer }) {
  const [showSolution, setShowSolution] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswer = (idx) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(idx);
    if (onAnswer) onAnswer(idx, idx === question.answer);
  };

  return (
    <div>
      {/* Nếu có đáp án trắc nghiệm kèm */}
      {question.options && question.options.length > 0 && (
        <div className="options-list">
          {question.options.map((opt, idx) => {
            let cls = 'option-btn';
            if (selectedAnswer !== null) {
              if (idx === question.answer) cls += ' correct';
              else if (idx === selectedAnswer) cls += ' incorrect';
            }
            return (
              <button
                key={idx}
                id={`calc-option-${question.id}-${idx}`}
                className={cls}
                onClick={() => handleAnswer(idx)}
                disabled={selectedAnswer !== null}
              >
                <span style={{ fontWeight: 700, marginRight: 8, color: 'var(--text-3)' }}>
                  {['A', 'B', 'C', 'D'][idx]}.
                </span>
                {opt}
              </button>
            );
          })}
        </div>
      )}

      {/* Lời giải từng bước */}
      <button
        className="calc-solution-toggle"
        id={`solution-toggle-${question.id}`}
        onClick={() => setShowSolution(!showSolution)}
        style={{ marginTop: 12 }}
      >
        {showSolution ? '🔼' : '🔽'} Xem lời giải từng bước
      </button>

      {showSolution && (
        <div className="calc-solution-content">
          {question.solution || question.explanation || 'Chưa có lời giải chi tiết.'}
        </div>
      )}
    </div>
  );
}

// ─── Short Essay ─────────────────────────────────────────────────────────────
function ShortEssayQuestion({ question, onAnswer, subjectId }) {
  const [studentText, setStudentText] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [evaluated, setEvaluated] = useState(null); // 'mastered' | 'needs_review' | null

  const handleMastered = () => {
    setEvaluated('mastered');
    if (onAnswer) onAnswer('mastered', true);
  };

  const handleNeedsReview = () => {
    setEvaluated('needs_review');
    // Lưu câu cần ôn lại
    if (subjectId) {
      const key = `wrongQ_${subjectId}`;
      const stored = JSON.parse(localStorage.getItem(key) || '[]');
      if (!stored.includes(question.id)) {
        localStorage.setItem(key, JSON.stringify([...stored, question.id]));
      }
    }
    if (onAnswer) onAnswer('needs_review', false);
  };

  return (
    <div>
      <textarea
        className="essay-input"
        id={`essay-input-${question.id}`}
        placeholder="Viết câu trả lời của bạn vào đây..."
        value={studentText}
        onChange={(e) => setStudentText(e.target.value)}
        disabled={evaluated !== null}
      />

      {/* Reveal model answer */}
      {!showAnswer && (
        <button
          className="essay-reveal-btn"
          id={`reveal-btn-${question.id}`}
          onClick={() => setShowAnswer(true)}
          style={{ marginTop: 12 }}
        >
          👁 Xem đáp án mẫu
        </button>
      )}

      {showAnswer && (
        <div className="explanation" style={{ marginTop: 12 }}>
          <strong>📝 Đáp án mẫu:</strong>
          <div style={{ marginTop: 8, whiteSpace: 'pre-wrap' }}>
            {question.modelAnswer || question.explanation || 'Chưa có đáp án mẫu.'}
          </div>
        </div>
      )}

      {/* Self evaluation */}
      {showAnswer && evaluated === null && (
        <div className="essay-self-eval">
          <button
            className="btn-mastered"
            id={`mastered-btn-${question.id}`}
            onClick={handleMastered}
          >
            ✅ Tôi đã nắm được
          </button>
          <button
            className="btn-needs-review"
            id={`review-btn-${question.id}`}
            onClick={handleNeedsReview}
          >
            📌 Cần ôn thêm
          </button>
        </div>
      )}

      {evaluated === 'mastered' && (
        <div style={{ marginTop: 12, padding: '10px 16px', background: 'var(--success-light)', borderRadius: 'var(--radius)', color: 'var(--success)', fontWeight: 600 }}>
          ✅ Tuyệt vời! Bạn đã nắm được kiến thức này.
        </div>
      )}

      {evaluated === 'needs_review' && (
        <div style={{ marginTop: 12, padding: '10px 16px', background: 'var(--warning-light)', borderRadius: 'var(--radius)', color: '#92400e', fontWeight: 600 }}>
          📌 Đã đánh dấu vào "Sổ Tay Ôn Lại" để ôn thêm!
        </div>
      )}
    </div>
  );
}

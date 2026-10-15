/**
 * TrueFalseQuestion — Component riêng cho dạng câu hỏi Đúng / Sai (type: 'true_false').
 * KHÔNG dùng chung với trắc nghiệm để tránh ảnh hưởng logic multiple_choice.
 *
 * Layout: trái = hộp vàng "Văn bản đọc hiểu / Ngữ cảnh" (sticky), phải = các ý a) b) c) d).
 * Mobile: ngữ cảnh ở trên (thu gọn được), các ý ở dưới.
 *
 * mode:
 *  - 'practice': chọn xong ý nào → hiện kết quả + giải thích ý đó ngay; nút "Kiểm tra đáp án" hiện tất cả
 *  - 'review'  : như practice, không hiện nút đánh dấu sổ tay (đã ở trong sổ tay)
 *  - 'exam'    : chọn/đổi tự do, KHÔNG hiện đáp án (controlled qua value/onChange)
 *  - 'result'  : chỉ đọc, hiện đáp án + giải thích (màn kết quả thi)
 */
import { useState, useEffect } from 'react';
import {
  getItemKey,
  cleanStatement,
  cleanExplanation,
  getContext,
  scoreTrueFalse,
} from '../lib/trueFalse';
import './TrueFalseQuestion.css';

const readWrongList = (subjectId) => {
  try {
    return JSON.parse(localStorage.getItem(`wrongQ_${subjectId}`) || '[]');
  } catch {
    return [];
  }
};

export default function TrueFalseQuestion({
  question,
  subjectId,
  mode = 'practice',
  value,
  onChange,
  onComplete,
  showBookmark = true,
}) {
  const items = Array.isArray(question?.items) ? question.items : [];
  const context = getContext(question);
  const isControlled = mode === 'exam' || mode === 'result';

  const [localAnswers, setLocalAnswers] = useState({}); // { a: true, b: false }
  const [revealAll, setRevealAll] = useState(mode === 'result');
  const [contextOpen, setContextOpen] = useState(true);
  const [bookmarked, setBookmarked] = useState(
    () => !!subjectId && readWrongList(subjectId).includes(question.id)
  );
  const [completedReported, setCompletedReported] = useState(false);

  const answers = isControlled ? value || {} : localAnswers;
  const showFeedback = mode === 'practice' || mode === 'review' || mode === 'result';

  const isRevealed = (key) => mode === 'result' || (showFeedback && (revealAll || answers[key] !== undefined));
  const allRevealed = items.every((item, idx) => isRevealed(getItemKey(item, idx)));
  const { correctCount, total, allCorrect } = scoreTrueFalse(question, answers);
  const hasWrong = allRevealed && !allCorrect;

  // Báo kết quả 1 lần khi tất cả các ý đã được hiện đáp án (practice/review)
  useEffect(() => {
    if (mode === 'exam' || mode === 'result') return;
    if (allRevealed && !completedReported && items.length > 0) {
      setCompletedReported(true);
      if (onComplete) onComplete(allCorrect, answers);
    }
  }, [allRevealed, completedReported, allCorrect, answers, items.length, mode, onComplete]);

  const handleChoose = (key, choice) => {
    if (mode === 'result') return;
    if (mode === 'exam') {
      if (onChange) onChange({ ...answers, [key]: choice });
      return;
    }
    // practice / review: mỗi ý chỉ chọn 1 lần (đã hiện đáp án thì khóa)
    if (isRevealed(key)) return;
    setLocalAnswers((prev) => ({ ...prev, [key]: choice }));
  };

  const handleReset = () => {
    setLocalAnswers({});
    setRevealAll(false);
    setCompletedReported(false);
  };

  const handleBookmark = () => {
    if (!subjectId || bookmarked) return;
    const stored = readWrongList(subjectId);
    if (!stored.includes(question.id)) {
      localStorage.setItem(`wrongQ_${subjectId}`, JSON.stringify([...stored, question.id]));
    }
    setBookmarked(true);
  };

  const answeredCount = items.filter((item, idx) => answers[getItemKey(item, idx)] !== undefined).length;

  return (
    <div className={`tf-question tf-mode-${mode} ${context ? 'has-context' : ''}`}>
      {/* ─── Ngữ cảnh (trái / trên) ─── */}
      {context && (
        <section className={`tf-context ${contextOpen ? 'open' : 'closed'}`} aria-label="Văn bản đọc hiểu / Ngữ cảnh">
          <button
            type="button"
            className="tf-context-toggle no-select"
            id={`tf-context-toggle-${question.id}`}
            aria-expanded={contextOpen}
            onClick={() => setContextOpen((o) => !o)}
          >
            <span>📜 Văn bản đọc hiểu / Ngữ cảnh</span>
            <span className="tf-context-chevron">{contextOpen ? '🔼 Thu gọn' : '🔽 Mở rộng'}</span>
          </button>
          <div className="tf-context-body">{context}</div>
        </section>
      )}

      {/* ─── Các ý a) b) c) d) (phải / dưới) ─── */}
      <div className="tf-main">
        <p className="tf-instruction">
          {question.question || 'Đọc ngữ cảnh và chọn Đúng (Đ) hoặc Sai (S) cho mỗi nhận định sau:'}
        </p>

        <ol className="tf-items">
          {items.map((item, idx) => {
            const key = getItemKey(item, idx);
            const chosen = answers[key];
            const revealed = isRevealed(key);
            const isRight = chosen === item.answer;
            const unanswered = chosen === undefined;

            let itemCls = 'tf-item';
            if (revealed) itemCls += unanswered ? ' is-skipped' : isRight ? ' is-correct' : ' is-wrong';

            const btnCls = (choice) => {
              let cls = `tf-btn ${choice ? 'tf-btn-true' : 'tf-btn-false'}`;
              if (chosen === choice) cls += ' selected';
              if (revealed && item.answer === choice) cls += ' is-answer';
              if (revealed && chosen === choice && !isRight) cls += ' is-miss';
              return cls;
            };

            return (
              <li key={key} className={itemCls}>
                <div className="tf-item-head">
                  <span className="tf-key no-select">{key}</span>
                  <p className="tf-statement">{cleanStatement(item.statement)}</p>
                  {revealed && (
                    <span className="tf-mark no-select" aria-hidden="true">
                      {unanswered ? '⏺' : isRight ? '✅' : '❌'}
                    </span>
                  )}
                </div>

                <div className="tf-choices no-select" role="radiogroup" aria-label={`Ý ${key}`}>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={chosen === true}
                    id={`tf-${question.id}-${key}-true`}
                    className={btnCls(true)}
                    onClick={() => handleChoose(key, true)}
                    disabled={mode === 'result' || (mode !== 'exam' && revealed)}
                  >
                    <span className="tf-btn-icon">✓</span> Đúng (Đ)
                  </button>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={chosen === false}
                    id={`tf-${question.id}-${key}-false`}
                    className={btnCls(false)}
                    onClick={() => handleChoose(key, false)}
                    disabled={mode === 'result' || (mode !== 'exam' && revealed)}
                  >
                    <span className="tf-btn-icon">✗</span> Sai (S)
                  </button>
                </div>

                {revealed && (
                  <div className="tf-feedback">
                    <div className={`tf-verdict ${unanswered ? 'skipped' : isRight ? 'right' : 'wrong'}`}>
                      {unanswered
                        ? `⏺ Chưa chọn — Đáp án: ${item.answer ? 'Đúng' : 'Sai'}`
                        : isRight
                        ? '🎉 Chính xác!'
                        : `Chưa đúng — Đáp án: ${item.answer ? 'Đúng' : 'Sai'}`}
                    </div>
                    {item.explanation && (
                      <div className={`tf-explain ${item.answer ? 'why-true' : 'why-false'}`}>
                        <strong>💡 Tại sao {item.answer ? 'Đúng' : 'Sai'}?</strong>
                        <span>{cleanExplanation(item.explanation)}</span>
                      </div>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ol>

        {/* ─── Hành động / tổng kết (practice & review) ─── */}
        {(mode === 'practice' || mode === 'review') && (
          <div className="tf-actions">
            {!allRevealed && (
              <button
                type="button"
                className="tf-check-btn"
                id={`tf-check-${question.id}`}
                onClick={() => setRevealAll(true)}
              >
                🔍 Kiểm tra đáp án ({answeredCount}/{total} ý đã chọn)
              </button>
            )}

            {allRevealed && (
              <div className={`tf-summary ${allCorrect ? 'perfect' : 'imperfect'}`}>
                <div className="tf-summary-score">
                  {allCorrect ? '🌟' : '📊'} Bạn làm đúng <strong>{correctCount}/{total}</strong> ý
                </div>
                <div className="tf-summary-actions">
                  {hasWrong && showBookmark && (
                    <button
                      type="button"
                      className={`tf-bookmark-btn ${bookmarked ? 'done' : ''}`}
                      id={`tf-bookmark-${question.id}`}
                      onClick={handleBookmark}
                      disabled={bookmarked}
                    >
                      {bookmarked ? '✓ Đã có trong Sổ Tay Sai' : '📌 Thêm vào Sổ Tay Sai để ôn thêm'}
                    </button>
                  )}
                  <button type="button" className="tf-reset-btn" id={`tf-reset-${question.id}`} onClick={handleReset}>
                    🔄 Làm lại
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {mode === 'exam' && (
          <div className="tf-exam-hint">
            Đã chọn {answeredCount}/{total} ý — có thể đổi lựa chọn trước khi nộp bài.
          </div>
        )}

        {mode === 'result' && (
          <div className={`tf-summary ${allCorrect ? 'perfect' : 'imperfect'}`}>
            <div className="tf-summary-score">
              {allCorrect ? '🌟' : '📊'} Đúng <strong>{correctCount}/{total}</strong> ý
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

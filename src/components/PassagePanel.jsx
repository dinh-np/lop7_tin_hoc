import { useState } from 'react';
import './PassagePanel.css';

/**
 * PassagePanel — khung văn bản đọc hiểu (Ngữ văn).
 * Sticky ở đầu card để HS vừa đọc vừa trả lời; bấm để thu gọn/mở rộng.
 */
export default function PassagePanel({ passage }) {
  const [open, setOpen] = useState(true);
  if (!passage) return null;

  return (
    <section className={`passage-panel ${open ? 'open' : 'closed'}`} aria-label="Văn bản đọc hiểu">
      <button
        type="button"
        className="passage-toggle no-select"
        id="passage-toggle"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span>📜 Văn bản đọc hiểu</span>
        <span className="passage-chevron">{open ? '🔼 Thu gọn' : '🔽 Mở rộng'}</span>
      </button>
      {open && <div className="passage-body">{passage}</div>}
    </section>
  );
}

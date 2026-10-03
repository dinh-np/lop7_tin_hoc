import { useState } from 'react';
import Exam from './Exam';
import { questionsBySubject } from '../data/questionBank';
import { nguVanTestMeta } from '../data/nguVanQuestions';
import './NguVanExamPicker.css';

/**
 * Thi thử Ngữ văn: chọn 1 trong 6 đề, thi đủ toàn bộ câu của đề (đúng thứ tự),
 * đếm ngược theo time_limit_minutes của đề.
 */
export default function NguVanExam({ subjectId }) {
  const [selected, setSelected] = useState(null);

  if (selected) {
    return (
      <div>
        <button className="btn-ghost" onClick={() => window.confirm('Thoát đề thi? Bài làm hiện tại sẽ mất.') && setSelected(null)} style={{ marginBottom: 12 }}>
          ← Chọn đề khác
        </button>
        <Exam
          key={selected.id}
          subjectId={subjectId}
          examId={selected.id}
          durationMinutes={selected.time_limit_minutes}
        />
      </div>
    );
  }

  const list = questionsBySubject[subjectId] || [];

  return (
    <div className="card">
      <div className="card-title"><span>📝 Chọn đề thi thử Ngữ văn 7</span></div>
      <div className="nv-exam-grid">
        {nguVanTestMeta.map((m) => {
          const count = list.filter((q) => q.examId === m.id).length;
          return (
            <button key={m.id} id={`nv-exam-${m.id}`} className="nv-exam-card" onClick={() => setSelected(m)}>
              <div className="nv-exam-title">{m.title.replace(/\s*\(.*\)$/, '')}</div>
              <div className="nv-exam-meta">⏱ {m.time_limit_minutes} phút · {count} câu</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

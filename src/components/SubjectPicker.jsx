import { SUBJECTS } from '../data/subjects';
import { getQuestionsForSubject } from '../data/questionBank';

export default function SubjectPicker({ onSelect }) {
  return (
    <div>
      <div className="home-hero">
        <h1>📚 Cổng Ôn Tập Lớp 7</h1>
        <p>Chọn môn học để bắt đầu luyện tập & thi thử</p>
      </div>

      <div className="subject-grid">
        {SUBJECTS.map((subject) => {
          const questions = getQuestionsForSubject(subject.id);
          const count = questions.length;
          const isEmpty = count === 0;

          return (
            <div
              key={subject.id}
              className={`subject-card ${subject.isPet ? 'pet' : ''} ${isEmpty ? 'empty-subject' : ''}`}
              onClick={() => onSelect(subject.id)}
              style={isEmpty ? { opacity: 0.65 } : {}}
            >
              {!isEmpty && <span className="subject-badge">Sẵn sàng</span>}
              {isEmpty && (
                <span className="subject-badge" style={{ background: '#94a3b8' }}>
                  Sắp có
                </span>
              )}
              <span className="subject-icon">{subject.icon}</span>
              <div className="subject-name">{subject.name}</div>
              <div className="subject-desc">{subject.description}</div>
              <div className="subject-count">
                {count > 0 ? `${count} câu hỏi` : 'Chưa có câu hỏi'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

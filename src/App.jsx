import { useState, useEffect } from 'react';
import SubjectPicker from './components/SubjectPicker';
import Quiz from './components/Quiz';
import Exam from './components/Exam';
import Review from './components/Review';
import { getSubject } from './data/subjects';
import { hasEssayQuestions } from './data/questionBank';
import './styles/theme.css';

function App() {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [mode, setMode] = useState('practice'); // practice | exam | review
  const [partChoice, setPartChoice] = useState('mcq'); // mcq | essay
  const [installPrompt, setInstallPrompt] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') setInstallPrompt(null);
  };

  const handleSelectSubject = (subjectId) => {
    setSelectedSubject(subjectId);
    setMode('practice');
    setPartChoice('mcq');
  };

  const handleBack = () => {
    setSelectedSubject(null);
  };

  const subjectInfo = selectedSubject ? getSubject(selectedSubject) : null;
  const splitParts = selectedSubject ? hasEssayQuestions(selectedSubject) : false;
  const part = splitParts ? partChoice : 'all';

  return (
    <div className="app">
      {/* ─── HEADER ─── */}
      <header className="header">
        <div className="header-brand" onClick={handleBack} role="button" tabIndex={0}>
          <div className="header-logo">📚</div>
          <div>
            <div className="header-title">Ôn Tập Lớp 7</div>
            {subjectInfo && (
              <div className="header-subtitle">{subjectInfo.icon} {subjectInfo.name}</div>
            )}
          </div>
        </div>
        <div className="header-actions">
          {installPrompt && (
            <button className="install-btn" onClick={handleInstall}>
              📲 Cài App
            </button>
          )}
        </div>
      </header>

      {/* ─── CONTENT ─── */}
      <div className="container">
        {!selectedSubject ? (
          /* Home: Subject Picker */
          <SubjectPicker onSelect={handleSelectSubject} />
        ) : (
          /* Subject View */
          <div>
            {/* Back + Subject header */}
            <div className="subject-header">
              <button className="subject-back-btn" onClick={handleBack}>
                ← Chọn môn khác
              </button>
              <span className="subject-header-name">
                {subjectInfo?.icon} {subjectInfo?.name}
              </span>
            </div>

            {/* Mode tabs */}
            <nav className="nav">
              <button
                className={`nav-btn ${mode === 'practice' ? 'active' : ''}`}
                onClick={() => setMode('practice')}
              >
                ✏️ Luyện Tập
              </button>
              <button
                className={`nav-btn ${mode === 'exam' ? 'active' : ''}`}
                onClick={() => setMode('exam')}
              >
                📝 Thi Thử
              </button>
              <button
                className={`nav-btn ${mode === 'review' ? 'active' : ''}`}
                onClick={() => setMode('review')}
              >
                📖 Sổ Tay Sai
              </button>
            </nav>

            {/* Tách riêng Trắc nghiệm / Tự luận (chỉ khi môn có cả hai) */}
            {splitParts && (
              <nav className="nav" style={{ marginBottom: 12 }}>
                <button
                  className={`nav-btn ${partChoice === 'mcq' ? 'active' : ''}`}
                  onClick={() => setPartChoice('mcq')}
                >
                  🔘 Phần Trắc nghiệm
                </button>
                <button
                  className={`nav-btn ${partChoice === 'essay' ? 'active' : ''}`}
                  onClick={() => setPartChoice('essay')}
                >
                  ✍️ Phần Tự luận
                </button>
              </nav>
            )}

            {/* Mode content — key theo phần để reset state khi đổi phần */}
            <main>
              {mode === 'practice' && <Quiz key={`quiz-${selectedSubject}-${part}`} subjectId={selectedSubject} part={part} />}
              {mode === 'exam' && <Exam key={`exam-${selectedSubject}-${part}`} subjectId={selectedSubject} part={part} />}
              {mode === 'review' && <Review key={`review-${selectedSubject}-${part}`} subjectId={selectedSubject} part={part} />}
            </main>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

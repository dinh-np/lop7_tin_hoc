import { useState, useEffect } from 'react';
import SubjectPicker from './components/SubjectPicker';
import Quiz from './components/Quiz';
import Exam from './components/Exam';
import Review from './components/Review';
import { getSubject } from './data/subjects';
import './styles/theme.css';

function App() {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [mode, setMode] = useState('practice'); // practice | exam | review
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
  };

  const handleBack = () => {
    setSelectedSubject(null);
  };

  const subjectInfo = selectedSubject ? getSubject(selectedSubject) : null;

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

            {/* Mode content */}
            <main>
              {mode === 'practice' && <Quiz subjectId={selectedSubject} />}
              {mode === 'exam' && <Exam key={`exam-${selectedSubject}`} subjectId={selectedSubject} />}
              {mode === 'review' && <Review subjectId={selectedSubject} />}
            </main>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

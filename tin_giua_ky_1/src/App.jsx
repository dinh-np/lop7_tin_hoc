import { useState, useEffect } from 'react';
import Quiz from './components/Quiz';
import Exam from './components/Exam';
import Review from './components/Review';
import './styles/theme.css';

function App() {
  const [mode, setMode] = useState('practice'); // practice, exam, review
  const [installPrompt, setInstallPrompt] = useState(null);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    });
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') {
      setInstallPrompt(null);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Luyện Thi Tin Học 7 - Giữa Kỳ I</h1>
        {installPrompt && (
          <button className="install-btn" onClick={handleInstall}>
            Cài đặt App
          </button>
        )}
      </header>

      <div className="container">
        <nav className="nav">
          <button 
            className={`nav-btn ${mode === 'practice' ? 'active' : ''}`}
            onClick={() => setMode('practice')}
          >
            Luyện Tập Theo Chủ Đề
          </button>
          <button 
            className={`nav-btn ${mode === 'exam' ? 'active' : ''}`}
            onClick={() => setMode('exam')}
          >
            Thi Thử (45 Phút)
          </button>
          <button 
            className={`nav-btn ${mode === 'review' ? 'active' : ''}`}
            onClick={() => setMode('review')}
          >
            Xem Câu Hỏi Sai
          </button>
        </nav>

        <main>
          {mode === 'practice' && <Quiz />}
          {mode === 'exam' && <Exam />}
          {mode === 'review' && <Review />}
        </main>
      </div>
    </div>
  );
}

export default App;

import { useState, useEffect } from 'react';
import SubjectPicker from './components/SubjectPicker';
import Quiz from './components/Quiz';
import Exam from './components/Exam';
import NguVanExam from './components/NguVanExam';
import ToanExam from './components/ToanExam';
import Review from './components/Review';
import { getSubject } from './data/subjects';
import { hasEssayQuestions, hasTrueFalseQuestions, syncSubjectData } from './data/questionBank';
import { enablePersistentStorage } from './lib/storagePersist';
import './styles/theme.css';

function App() {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [mode, setMode] = useState('practice'); // practice | exam | review
  const [partChoice, setPartChoice] = useState('mcq'); // mcq | essay
  const [installPrompt, setInstallPrompt] = useState(null);
  const [syncing, setSyncing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    enablePersistentStorage();
    const handler = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  // Tự động đồng bộ khi mở môn học
  useEffect(() => {
    if (selectedSubject) {
      setSyncing(true);
      syncSubjectData(selectedSubject).then((success) => {
        setSyncing(false);
        if (success) {
          setRefreshKey((k) => k + 1);
        }
      });
    }
  }, [selectedSubject]);

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

  const handleSyncData = async () => {
    if (!selectedSubject) return;
    setSyncing(true);
    const success = await syncSubjectData(selectedSubject);
    setSyncing(false);
    if (success) {
      setToastMsg('Đã cập nhật dữ liệu mới nhất thành công');
      setTimeout(() => setToastMsg(''), 3000);
      setRefreshKey((k) => k + 1);
    } else {
      setToastMsg('Môn này hiện đang dùng dữ liệu gốc, chưa có bản cập nhật mới.');
      setTimeout(() => setToastMsg(''), 3000);
    }
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
          {selectedSubject && (
            <button className="btn-outline" onClick={handleSyncData} disabled={syncing} style={{ padding: '6px 12px', fontSize: '0.85rem', marginRight: 8 }}>
              {syncing ? '⏳ Đang tải...' : '🔄 Đồng bộ đề mới'}
            </button>
          )}
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
            {(splitParts || hasTrueFalseQuestions(selectedSubject)) && (
              <nav className="nav" style={{ marginBottom: 12 }}>
                <button
                  className={`nav-btn ${partChoice === 'mcq' ? 'active' : ''}`}
                  onClick={() => setPartChoice('mcq')}
                >
                  🔘 Phần Trắc nghiệm
                </button>
                {hasTrueFalseQuestions(selectedSubject) && (
                  <button
                    className={`nav-btn ${partChoice === 'tf' ? 'active' : ''}`}
                    onClick={() => setPartChoice('tf')}
                  >
                    ⚖️ Đúng / Sai
                  </button>
                )}
                {splitParts && (
                  <button
                    className={`nav-btn ${partChoice === 'essay' ? 'active' : ''}`}
                    onClick={() => setPartChoice('essay')}
                  >
                    ✍️ Phần Tự luận
                  </button>
                )}
              </nav>
            )}

            {/* Mode content — key theo phần để reset state khi đổi phần */}
            <main>
              {mode === 'practice' && <Quiz key={`quiz-${selectedSubject}-${part}-${refreshKey}`} subjectId={selectedSubject} part={part} />}
              {mode === 'exam' && (
                selectedSubject === 'ngu_van'
                  ? <NguVanExam key={`exam-${selectedSubject}-${refreshKey}`} subjectId={selectedSubject} />
                  : selectedSubject === 'toan'
                  ? <ToanExam key={`exam-${selectedSubject}-${refreshKey}`} subjectId={selectedSubject} />
                  : <Exam key={`exam-${selectedSubject}-${part}-${refreshKey}`} subjectId={selectedSubject} part={part} />
              )}
              {mode === 'review' && <Review key={`review-${selectedSubject}-${part}-${refreshKey}`} subjectId={selectedSubject} part={part} />}
            </main>
          </div>
        )}
      </div>

      {/* Toast Notification */}
      {toastMsg && (
        <div className="toast-notification">
          {toastMsg}
        </div>
      )}
    </div>
  );
}

export default App;

// Firebase Firestore client — Offline-First với IndexedDB persistent cache
// Đọc cấu hình từ biến môi trường VITE_FIREBASE_*
// Hỗ trợ multi-tab (Safari/iPadOS) qua persistentMultipleTabManager

import { initializeApp, getApps } from 'firebase/app';
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  serverTimestamp,
} from 'firebase/firestore';

const FIREBASE_API_KEY       = import.meta.env.VITE_FIREBASE_API_KEY;
const FIREBASE_AUTH_DOMAIN   = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
const FIREBASE_PROJECT_ID    = import.meta.env.VITE_FIREBASE_PROJECT_ID;
const FIREBASE_STORAGE_BUCKET= import.meta.env.VITE_FIREBASE_STORAGE_BUCKET;
const FIREBASE_MESSAGING_ID  = import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID;
const FIREBASE_APP_ID        = import.meta.env.VITE_FIREBASE_APP_ID;

// Kiểm tra xem Firebase có được cấu hình đầy đủ chưa
export const isFirebaseConfigured =
  !!FIREBASE_API_KEY &&
  FIREBASE_API_KEY !== 'YOUR_FIREBASE_API_KEY' &&
  !!FIREBASE_PROJECT_ID &&
  FIREBASE_PROJECT_ID !== 'YOUR_FIREBASE_PROJECT_ID';

// Khởi tạo Firebase app singleton
let _db = null;

function getDb() {
  if (!isFirebaseConfigured) return null;
  if (_db) return _db;

  try {
    const firebaseConfig = {
      apiKey: FIREBASE_API_KEY,
      authDomain: FIREBASE_AUTH_DOMAIN,
      projectId: FIREBASE_PROJECT_ID,
      storageBucket: FIREBASE_STORAGE_BUCKET,
      messagingSenderId: FIREBASE_MESSAGING_ID,
      appId: FIREBASE_APP_ID,
    };

    // Tránh khởi tạo lại nếu đã có app (Hot Module Replacement trong dev)
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

    // Khởi tạo Firestore với IndexedDB persistent cache
    // persistentMultipleTabManager: tránh lỗi failed-precondition trên Safari/iPadOS khi mở nhiều tab
    _db = initializeFirestore(app, {
      localCache: persistentLocalCache({
        tabManager: persistentMultipleTabManager(),
      }),
    });

    console.log('[Firebase] Firestore initialized with IndexedDB persistent cache ✓');
    return _db;
  } catch (err) {
    console.error('[Firebase] Init failed:', err);
    return null;
  }
}

// ─── SUBMISSIONS (thay thế sessions) ────────────────────────────────────────

/**
 * Lưu kết quả bài thi vào Firestore collection 'submissions'.
 * Khi offline → Firestore ghi vào IndexedDB, tự sync khi có mạng.
 * @param {Object} data
 */
export async function saveSubmission(data) {
  const db = getDb();
  if (!db) {
    console.log('[Firebase] Not configured – submission saved locally only');
    return null;
  }

  try {
    const docRef = await addDoc(collection(db, 'submissions'), {
      test_id: data.testId || null,
      subject: data.subject,
      mode: data.mode,
      score: data.score,
      correct_count: data.correctCount,
      wrong_count: data.wrongCount,
      time_spent_seconds: data.durationSeconds,
      submitted_at: serverTimestamp(),
    });
    console.log('[Firebase] Submission saved ✓', docRef.id);
    return docRef.id;
  } catch (err) {
    // Lỗi network khi offline: Firestore SDK tự queue, KHÔNG throw
    console.error('[Firebase] saveSubmission error:', err);
    return null;
  }
}

/**
 * Lưu các câu trả lời sai vào collection 'wrong_answers'.
 * @param {string} submissionId
 * @param {Array}  wrongItems
 */
export async function saveWrongAnswers(submissionId, wrongItems) {
  const db = getDb();
  if (!db || !wrongItems?.length) return;

  try {
    const promises = wrongItems.map((item) =>
      addDoc(collection(db, 'wrong_answers'), {
        submission_id: submissionId,
        test_id: item.testId || null,
        question_id: item.question.id,
        question_text: item.question.question,
        question_topic: item.question.topic,
        student_answer: item.studentAnswer,
        correct_answer: item.question.answer,
        explanation: item.question.explanation || '',
        error_reason_type: null,
        ai_diagnostic: null,
        submitted_at: serverTimestamp(),
      })
    );
    await Promise.all(promises);
    console.log('[Firebase] Wrong answers saved ✓', wrongItems.length);
  } catch (err) {
    console.error('[Firebase] saveWrongAnswers error:', err);
  }
}

/**
 * Lấy danh sách bài nộp gần đây (dành cho phụ huynh giám sát).
 * @param {number} limitCount
 */
export async function fetchSubmissions(limitCount = 20) {
  const db = getDb();
  if (!db) return [];

  try {
    const q = query(
      collection(db, 'submissions'),
      orderBy('submitted_at', 'desc'),
      limit(limitCount)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    console.error('[Firebase] fetchSubmissions error:', err);
    return [];
  }
}

/**
 * Kiểm tra trạng thái kết nối Firebase.
 */
export async function checkFirebaseStatus() {
  if (!isFirebaseConfigured) return { connected: false, reason: 'not_configured' };
  const db = getDb();
  if (!db) return { connected: false, reason: 'client_init_failed' };
  try {
    // Thử đọc 1 doc để xác nhận kết nối
    const q = query(collection(db, 'submissions'), limit(1));
    await getDocs(q);
    return { connected: true };
  } catch (err) {
    return { connected: false, reason: err.message };
  }
}

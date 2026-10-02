# Dự án: Sổ Tay Ôn Tập Của Con

## Tổng quan
PWA ôn thi đa môn cho học sinh lớp 7. Stack: React 19 + Vite 8 + Firebase Firestore (Offline-First) + Gemini AI.

**Cập nhật 2026-10-02**: Đã migrate từ Supabase Local → Firebase Firestore với IndexedDB persistent cache (offline-first).

## Tech Stack
- **Frontend**: React 19, Vite 8, Vanilla CSS (Be Vietnam Pro font)
- **AI**: Gemini 2.0 Flash (`VITE_GEMINI_API_KEY` — dạng `AQ.xxx`)
- **DB**: Firebase Firestore (`VITE_FIREBASE_*`) — IndexedDB persistent cache, offline-first
- **Deploy**: Vercel (SPA rewrites, outputDirectory: dist) → GitHub: `dinh-np/lop7_tin_hoc`
- **PWA**: `beforeinstallprompt` event + Apple meta tags + Service Worker

## Cấu trúc thư mục
```
src/
├── components/
│   ├── SubjectPicker.jsx     ← màn hình home chọn môn
│   ├── Quiz.jsx              ← luyện tập (nhận prop subjectId)
│   ├── Exam.jsx              ← thi thử 45' + Firebase save + AI analysis sau nộp bài
│   ├── Review.jsx            ← sổ tay câu sai (per-subject localStorage)
│   └── QuestionRenderer.jsx  ← [MỚI] render 3 loại câu hỏi
├── data/
│   ├── subjects.js           ← SUBJECTS array (10 môn + PET B1)
│   ├── questionBank.js       ← index, export getQuestionsForSubject()
│   ├── tinHocQuestions.js    ← 70 câu, subject:'tin_hoc'
│   └── petB1Questions.js     ← 20 câu mẫu PET B1
├── lib/
│   ├── gemini.js             ← diagnoseWrongAnswer(), batchDiagnose()
│   └── firebase.js           ← [MỚI - thay supabase.js] saveSubmission(), saveWrongAnswers(), fetchSubmissions()
└── styles/
    └── theme.css             ← design system (CSS variables, responsive, touch optimization)
public/
├── sw.js                     ← [CẬP NHẬT] CacheFirst + StaleWhileRevalidate
├── manifest.json             ← [CẬP NHẬT] icons đầy đủ, display: standalone
└── icons/
    ├── icon-180.png          ← [MỚI] iOS apple-touch-icon
    ├── icon-192.png          ← [MỚI] Android maskable
    └── icon-512.png          ← [MỚI] Android maskable
supabase/                     ← Đã deprecated, giữ lại để tham khảo
```

## Môn học (SUBJECTS trong subjects.js)
| id | Tên | Icon | Câu hỏi |
|----|-----|------|---------|
| tin_hoc | Tin học | 💻 | 70 câu |
| pet_b1 | PET B1 English | 🎓 | 20 câu mẫu |
| toan | Toán | 📐 | 0 (placeholder) |
| khoa_hoc_tu_nhien | KHTN | 🔬 | 0 |
| ngu_van | Ngữ văn | 📖 | 0 |
| tieng_anh | Tiếng Anh | 🇬🇧 | 0 |
| lich_su_dia_li | Lịch sử & Địa lí | 🗺️ | 0 |
| gdcd | GDCD | 🏛️ | 0 |
| cong_nghe | Công nghệ | ⚙️ | 0 |
| gd_dia_phuong | GD địa phương | 🏠 | 0 |

## Cấu trúc câu hỏi chuẩn
```js
// Loại 1: Trắc nghiệm (mặc định)
{
  id: 1,
  subject: 'tin_hoc',
  topic: 'Thiết bị vào-ra',
  type: 'multiple_choice',     // có thể bỏ qua (mặc định)
  skill: 'reading',            // tùy chọn, dùng cho PET B1
  question: '...',
  options: ['A. ...', 'B. ...', 'C. ...', 'D. ...'],
  answer: 2,                   // index 0-3
  explanation: '...',
}

// Loại 2: Tính toán
{
  id: 'calc_1',
  subject: 'toan',
  topic: 'Phương trình',
  type: 'calculation',
  question: '...',
  options: ['A. ...', 'B. ...', 'C. ...', 'D. ...'],  // tùy chọn
  answer: 0,
  solution: 'Bước 1: ...\nBước 2: ...',              // lời giải từng bước
  explanation: '...',
}

// Loại 3: Tự luận ngắn
{
  id: 'essay_1',
  subject: 'ngu_van',
  topic: 'Viết đoạn văn',
  type: 'short_essay',
  question: '...',
  modelAnswer: '...',          // đáp án mẫu
  explanation: '...',
}
```

## localStorage keys
- `wrongQ_tin_hoc` — mảng id câu sai Tin học
- `wrongQ_pet_b1` — mảng id câu sai PET B1
- Pattern: `wrongQ_${subjectId}`

## Firebase Firestore collections
```
submissions/        ← kết quả mỗi lần thi
  test_id, subject, mode, score,
  correct_count, wrong_count, time_spent_seconds, submitted_at

wrong_answers/      ← chi tiết câu sai per submission
  submission_id, test_id, question_id, question_text, question_topic,
  student_answer, correct_answer, explanation,
  error_reason_type, ai_diagnostic, submitted_at

tests/              ← (schema chuẩn bị cho tương lai)
  title, subject, term, time_limit_minutes,
  questions (array), is_active, created_at
```

## .env.local (KHÔNG commit)
```env
VITE_GEMINI_API_KEY=AQ.xxx          ← aistudio.google.com/app/apikey

# Firebase (thay Supabase)
VITE_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_PROJECT_ID.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_PROJECT_ID.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_FIREBASE_APP_ID
```

## Gemini AI flow
1. Sau nộp bài thi (`Exam.jsx`) → gọi `batchDiagnose(wrongs.slice(0,5))`
2. Prompt tiếng Việt, thân thiện HS lớp 7, max 120 từ/câu
3. Model: `gemini-2.0-flash`

## Firebase flow (Offline-First)
1. Sau nộp bài: `saveSubmission(data)` → Firestore collection `submissions`
2. Nếu có câu sai: `saveWrongAnswers(submissionId, wrongs)` → collection `wrong_answers`
3. Khi offline: Firestore ghi vào IndexedDB, tự sync khi có mạng trở lại
4. Multi-tab safe: `persistentMultipleTabManager` tránh lỗi `failed-precondition` trên Safari

## Vercel deploy
```json
{ "buildCommand":"npm run build", "outputDirectory":"dist",
  "rewrites":[{"source":"/(.*)","destination":"/index.html"}],
  "cleanUrls":true, "trailingSlash":false }
```

**⚠️ Sau migrate Firebase**: thêm 6 biến `VITE_FIREBASE_*` vào Vercel Dashboard → Environment Variables.

## Responsive Breakpoints
- **Mobile < 768px**: palette scroll ngang, layout 1 cột
- **Tablet 768–1024px**: split-view 2 cột (question left, timer+palette right)
- **Desktop > 1024px**: max-width 960px + keyboard shortcuts (1-4/A-D + ←→)

## Keyboard Shortcuts (Desktop, trong thi)
- `1`/`A`, `2`/`B`, `3`/`C`, `4`/`D` → chọn đáp án
- `←`/`↑` → câu trước | `→`/`↓` → câu tiếp

## PWA iOS/Android
- `viewport-fit=cover` → hỗ trợ notch, Dynamic Island
- `apple-mobile-web-app-*` meta tags → standalone mode iPhone/iPad
- Icons: 180px (iOS), 192px + 512px maskable (Android)
- Service Worker: CacheFirst tĩnh, StaleWhileRevalidate fonts, bỏ qua Firebase requests

## Thêm môn mới
1. Tạo `src/data/[ten]Questions.js` với `subject: '[id]'`
2. Import trong `questionBank.js` → thêm vào `questionsBySubject`
3. Môn tự động hiển thị trong SubjectPicker (count > 0 → badge "Sẵn sàng")

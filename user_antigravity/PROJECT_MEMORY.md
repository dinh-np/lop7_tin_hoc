# Dự án: Sổ Tay Ôn Tập Của Con

## Tổng quan
PWA ôn thi đa môn cho học sinh lớp 7. Stack: React 19 + Vite 8 + Firebase Firestore (Offline-First) + Gemini AI.

**Cập nhật 2026-10-02**: Đã migrate hoàn toàn từ Supabase Local → Firebase Firestore. Đã test thành công cả local lẫn Vercel production.

## Tech Stack
- **Frontend**: React 19, Vite 8, Vanilla CSS (Be Vietnam Pro font)
- **AI**: Gemini 2.0 Flash (`VITE_GEMINI_API_KEY` — dạng `AQ.xxx`)
- **DB**: Firebase Firestore — project `sotayontap-4c27e` — IndexedDB persistent cache, offline-first
- **Deploy**: Vercel (auto-deploy từ GitHub push) → repo `dinh-np/lop7_tin_hoc`
- **PWA**: `beforeinstallprompt` + Apple meta tags + Service Worker (CacheFirst)

## Cấu trúc thư mục
```
src/
├── components/
│   ├── SubjectPicker.jsx     ← màn hình home chọn môn
│   ├── Quiz.jsx              ← luyện tập (nhận prop subjectId)
│   ├── Exam.jsx              ← thi thử 45' + Firebase save + AI analysis sau nộp bài
│   ├── Review.jsx            ← sổ tay câu sai (per-subject localStorage)
│   └── QuestionRenderer.jsx  ← render 3 loại câu hỏi (multiple_choice/calculation/short_essay)
├── data/
│   ├── subjects.js           ← SUBJECTS array (10 môn + PET B1)
│   ├── questionBank.js       ← index, export getQuestionsForSubject()
│   ├── tinHocQuestions.js    ← 70 câu, subject:'tin_hoc'
│   └── petB1Questions.js     ← 20 câu mẫu PET B1
├── lib/
│   ├── gemini.js             ← diagnoseWrongAnswer(), batchDiagnose()
│   └── firebase.js           ← saveSubmission(), saveWrongAnswers(), fetchSubmissions()
└── styles/
    └── theme.css             ← design system + responsive + touch optimization
public/
├── sw.js                     ← CacheFirst + StaleWhileRevalidate (bỏ qua Firebase requests)
├── manifest.json             ← icons đầy đủ, display: standalone
└── icons/
    ├── icon-180.png          ← iOS apple-touch-icon
    ├── icon-192.png          ← Android maskable
    └── icon-512.png          ← Android maskable
supabase/                     ← Deprecated, giữ lại để tham khảo
user_antigravity/             ← Tài liệu nội bộ cho AI assistant
```

## Firebase Project
- **Project ID**: `sotayontap-4c27e`
- **Console**: https://console.firebase.google.com/project/sotayontap-4c27e/firestore
- **Trạng thái**: ✅ Đã test kết nối thành công (2026-10-02)
- **Vercel env vars**: ✅ Đã thêm đủ 6 biến VITE_FIREBASE_* vào Vercel Dashboard

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
// Loại 1: Trắc nghiệm (mặc định, không cần ghi type)
{
  id: 1,                        // UNIQUE trên toàn bộ questionsBySubject
  subject: 'tin_hoc',           // PHẢI khớp với id trong subjects.js
  topic: 'Thiết bị vào-ra',    // dùng cho dropdown lọc trong Quiz
  type: 'multiple_choice',      // có thể bỏ qua (mặc định)
  skill: 'reading',             // tùy chọn, chỉ dùng cho PET B1
  question: '...',
  options: ['A. ...', 'B. ...', 'C. ...', 'D. ...'],
  answer: 2,                    // INDEX 0-3, KHÔNG phải chữ cái
  explanation: '...',           // BẮT BUỘC (AI dùng để phân tích)
}

// Loại 2: Tính toán
{
  id: 'calc_1',
  subject: 'toan',
  topic: 'Phương trình',
  type: 'calculation',
  question: '...',
  options: ['A...', 'B...', 'C...', 'D...'],   // tùy chọn
  answer: 0,
  solution: 'Bước 1: ...\nBước 2: ...',         // lời giải toggle
  explanation: '...',
}

// Loại 3: Tự luận ngắn
{
  id: 'essay_1',
  subject: 'ngu_van',
  topic: 'Viết đoạn văn',
  type: 'short_essay',
  question: '...',
  modelAnswer: '...',     // đáp án mẫu (reveal khi bấm nút)
  explanation: '...',
}
```

## localStorage keys
- `wrongQ_${subjectId}` — mảng id câu sai theo môn
- Ví dụ: `wrongQ_tin_hoc`, `wrongQ_pet_b1`

## Firebase Firestore Collections
```
submissions/
  subject, mode, score, correct_count, wrong_count,
  time_spent_seconds, submitted_at (serverTimestamp)

wrong_answers/
  submission_id, question_id, question_text, question_topic,
  student_answer, correct_answer, explanation,
  error_reason_type (null), ai_diagnostic (null), submitted_at
```

## .env.local (KHÔNG commit lên GitHub)
```env
VITE_GEMINI_API_KEY=AQ.Ab8RN6...

VITE_FIREBASE_API_KEY=AIzaSyBErj...
VITE_FIREBASE_AUTH_DOMAIN=sotayontap-4c27e.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=sotayontap-4c27e
VITE_FIREBASE_STORAGE_BUCKET=sotayontap-4c27e.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=703994711311
VITE_FIREBASE_APP_ID=1:703994711311:web:92a7684bb4b5018d5fc27a
```

## Gemini AI flow
1. Sau nộp bài thi → gọi `batchDiagnose(wrongs.slice(0,5))` (max 5 câu)
2. Prompt tiếng Việt, thân thiện HS lớp 7, max 120 từ/câu
3. Model: `gemini-2.0-flash`

## Firebase flow (Offline-First)
1. Sau nộp bài: `saveSubmission(data)` → collection `submissions`
2. Nếu có câu sai: `saveWrongAnswers(submissionId, wrongs.slice(0,20))` → `wrong_answers`
3. Offline: Firestore ghi vào IndexedDB, tự sync khi có mạng
4. Multi-tab safe: `persistentMultipleTabManager` tránh lỗi `failed-precondition` trên Safari

## Vercel Deploy
```json
{ "buildCommand":"npm run build", "outputDirectory":"dist",
  "rewrites":[{"source":"/(.*)","destination":"/index.html"}],
  "cleanUrls":true, "trailingSlash":false }
```
- **Auto-deploy**: Push lên GitHub → Vercel tự build & deploy
- **KHÔNG cần Vercel CLI** để deploy — chỉ cần `git push`
- Vercel CLI có lỗi upgrade trên Windows (EPERM) — bỏ qua, dùng git push thay thế

## Responsive Breakpoints
- **Mobile < 768px**: palette scroll ngang, layout 1 cột
- **Tablet 768–1024px**: split-view 2 cột (question | timer+palette)
- **Desktop > 1024px**: max-width 960px, keyboard shortcuts hiện

## Keyboard Shortcuts (Desktop, trong thi)
- `1`/`A`, `2`/`B`, `3`/`C`, `4`/`D` → chọn đáp án
- `←`/`↑` → câu trước | `→`/`↓` → câu tiếp

## PWA (iPhone/iPad/Android)
- `viewport-fit=cover` → hỗ trợ notch, Dynamic Island
- `apple-mobile-web-app-*` → standalone mode iPhone/iPad
- Icons: 180px (iOS), 192/512px maskable (Android)
- SW bỏ qua Firebase requests — Firestore SDK tự xử lý offline

## Thêm môn mới
1. Tạo `src/data/[ten]Questions.js` với `subject: '[id]'`
2. Import trong `questionBank.js` → thêm vào `questionsBySubject`
3. Môn tự động hiển thị khi count > 0 (badge "Sẵn sàng")

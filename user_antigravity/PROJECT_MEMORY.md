# Dự án: Sổ Tay Ôn Tập Của Con

## Tổng quan
PWA ôn thi đa môn cho học sinh lớp 7. Stack: React 19 + Vite 8 + Firebase Firestore (Offline-First) + Gemini AI.

**Cập nhật 2026-10-02**: Migrate hoàn toàn từ Supabase Local → Firebase Firestore. Đã test local + Vercel production.
**Cập nhật 2026-10-03**: Thêm dữ liệu KHTN, LS&ĐL, GDCD, Ngữ văn (6 đề); tách phần Trắc nghiệm/Tự luận; Split-View + thi theo đề cho Ngữ văn.
**Cập nhật 2026-10-04**: 
- Fix lỗi IndexedDB cache trên iOS (sử dụng `navigator.storage.persist()`).
- Tích hợp môn Toán 7 với 6 đề thi, hiển thị dưới dạng card chọn đề giống Ngữ văn.
- Cải tiến cơ chế đồng bộ Firestore (`fetchSubjectDataFromFirestore` & `syncSubjectData`), ưu tiên lấy mảng `questions` thay thế mảng tĩnh, tự động đồng bộ khi mở môn. Thêm nút Force Refresh (Đồng bộ đề mới) + Toast notification.

## Tech Stack
- **Frontend**: React 19, Vite 8, Vanilla CSS (Be Vietnam Pro font), `react-markdown` + `remark-gfm` (đáp án tự luận)
- **AI**: Gemini 2.0 Flash (`VITE_GEMINI_API_KEY` — dạng `AQ.xxx`)
- **DB**: Firebase Firestore — project `sotayontap-4c27e` — IndexedDB persistent cache, offline-first
- **Deploy**: Vercel (auto-deploy từ GitHub push) → repo `dinh-np/lop7_tin_hoc`
- **PWA**: `beforeinstallprompt` + Apple meta tags + Service Worker (CacheFirst)

## Cấu trúc thư mục
```
src/
├── components/
│   ├── SubjectPicker.jsx     ← màn hình home chọn môn
│   ├── Quiz.jsx              ← luyện tập (subjectId, part: all|mcq|essay)
│   ├── Exam.jsx              ← thi thử + Firebase save + AI analysis; props: examId, examTitle, durationMinutes
│   │                            (có examId → layout compact: topbar sticky + drawer danh sách câu, KHÔNG shuffle)
│   ├── NguVanExam.jsx        ← Ngữ văn: màn chọn 1 trong 6 đề → render <Exam examId=.../>
│   ├── ToanExam.jsx          ← Toán: màn chọn 1 trong 6 đề → render <Exam examId=.../>
│   ├── NguVanExamPicker.css  ← CSS thẻ chọn đề + topbar/drawer/split 39/61 khi thi Ngữ văn
│   ├── Review.jsx            ← sổ tay câu sai (per-subject localStorage)
│   ├── QuestionRenderer.jsx  ← multiple_choice / calculation / short_essay (+ hiện keyPoints)
│   ├── SplitView.jsx         ← bọc nội dung làm bài; nếu có `passage` → 2 cột (≥768px)
│   └── PassagePanel.jsx/.css ← khung văn bản đọc hiểu (sticky, thu gọn/mở rộng trên mobile)
├── data/
│   ├── subjects.js           ← SUBJECTS array (10 môn + PET B1)
│   ├── questionBank.js       ← index, getQuestionsForSubject(id, part), hasEssayQuestions()
│   ├── tinHocQuestions.js    ← 70 câu
│   ├── petB1Questions.js     ← 20 câu mẫu
│   ├── khoaHocTuNhienQuestions.js ← từ subjects/khtn7.json (64 câu)
│   ├── lichSuDiaLiQuestions.js    ← từ subjects/ls_dl7.json (55 câu)
│   ├── gdcdQuestions.js           ← từ subjects/gdcd7.json (46 câu)
│   ├── nguVanQuestions.js         ← từ subjects/nguvan7.json (53 câu tự luận, 6 đề)
│   ├── toanQuestions.js           ← từ subjects/toan7.js (102 câu, 6 đề)
│   └── subjects/             ← file JSON nguồn (gdcd7, khtn7, ls_dl7, nguvan7, toan7)
├── lib/
│   ├── gemini.js             ← diagnoseWrongAnswer(), batchDiagnose()
│   └── firebase.js           ← saveSubmission(), saveWrongAnswers(), fetchSubmissions()
└── styles/
    └── theme.css             ← design system + responsive + touch optimization
public/
├── sw.js, manifest.json, icons/ (180/192/512)
supabase/                     ← Deprecated, giữ để tham khảo
user_data/                    ← file yêu cầu/đề cương riêng tư (không commit nội dung nhạy cảm)
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
| khoa_hoc_tu_nhien | KHTN | 🔬 | 64 câu |
| lich_su_dia_li | Lịch sử & Địa lí | 🗺️ | 55 câu (50 TN + 5 TL) |
| gdcd | GDCD | 🏛️ | 46 câu (40 TN + 6 TL) |
| ngu_van | Ngữ văn | 📖 | 53 câu tự luận / 6 đề giữa kì I |
| toan | Toán | 📐 | 102 câu (72 TN + 30 TL) / 6 đề |
| tieng_anh | Tiếng Anh | 🇬🇧 | 0 |
| cong_nghe | Công nghệ | ⚙️ | 0 |
| gd_dia_phuong | GD địa phương | 🏠 | 0 |

## Cấu trúc câu hỏi chuẩn
```js
// Loại 1: Trắc nghiệm (mặc định)
{ id: 1, subject: 'tin_hoc', topic: '...', type: 'multiple_choice',
  skill: 'reading' /* chỉ PET B1 */, question: '...',
  options: ['A. ...', 'B. ...', 'C. ...', 'D. ...'],
  answer: 2,            // INDEX 0-3
  explanation: '...' }  // BẮT BUỘC (AI dùng)

// Loại 2: Tính toán
{ id: 'calc_1', subject: 'toan', topic: '...', type: 'calculation',
  question: '...', options: [...], answer: 0, solution: 'Bước 1...', explanation: '...' }

// Loại 3: Tự luận
{ id: 'essay_1', subject: 'ngu_van', topic: '...', type: 'short_essay',
  question: '...', modelAnswer: '... (markdown)', keyPoints: ['ý 1', 'ý 2'],
  explanation: '...' /* tùy chọn */ }
```

### Ngữ văn (đặc thù)
JSON nguồn `src/data/subjects/nguvan7.json` = mảng 6 đề:
`{ id:'van7_de_01', title, subject, term, time_limit_minutes:90, reading_passage, questions:[{id, part, type:'short_essay', question, modelAnswer, keyPoints}] }`.
`nguVanQuestions.js` flatten và gắn vào mỗi câu: `subject:'ngu_van'`, `topic = exam.title`, `examId = exam.id`, `passage = reading_passage`.
Đề 1–5 có 9 câu, đề 6 có 8 câu (tổng 53).

## Phân tách Trắc nghiệm / Tự luận
- `hasEssayQuestions(subjectId)` = môn có CẢ hai loại → App hiện 2 tab "Phần Trắc nghiệm / Phần Tự luận".
- `getQuestionsForSubject(id, 'mcq'|'essay'|'all')`.
- Ngữ văn chỉ có tự luận → không chia tab; tab Thi Thử được thay bằng `NguVanExam`.
- Tự luận: HS tự đánh giá "Đã nắm được / Cần ôn thêm" (đúng nếu `mastered`); textarea tự giãn chiều cao.

## localStorage keys
- `wrongQ_${subjectId}` — mảng id câu sai/cần ôn theo môn

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
VITE_GEMINI_API_KEY=AQ.xxx
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=sotayontap-4c27e.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=sotayontap-4c27e
VITE_FIREBASE_STORAGE_BUCKET=sotayontap-4c27e.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```
(Giá trị thật lấy từ file `.env.local` / Firebase Console — không ghi vào tài liệu.)

## Gemini AI flow
1. Sau nộp bài thi → `batchDiagnose(mcWrongs.slice(0,5))` (chỉ câu trắc nghiệm có `options`, max 5)
2. Prompt tiếng Việt, thân thiện HS lớp 7, max 120 từ/câu
3. Model: `gemini-2.0-flash`

## Firebase flow (Offline-First & Data Sync)
1. Sau nộp bài: `saveSubmission(data)` → `submissions`
2. Có câu sai: `saveWrongAnswers(submissionId, wrongs.slice(0,20))` → `wrong_answers`
3. Tải câu hỏi từ Firebase: Hàm `syncSubjectData(subjectId)` gọi `fetchSubjectDataFromFirestore` sử dụng `getDocFromServer` để ưu tiên Cloud, fallback về IndexedDB cache, ghi đè toàn bộ mảng câu hỏi trên UI.
4. Offline: Firestore ghi IndexedDB, tự sync khi có mạng
5. `persistentMultipleTabManager` tránh lỗi `failed-precondition` trên Safari
6. Apple iOS/WebKit: Dùng `navigator.storage.persist()` để ngăn trình duyệt tự xóa IndexedDB cache khi đầy bộ nhớ.

## Thi thử
- **Môn thường**: random 30 câu, 45 phút, sidebar phải (timer + palette) trên tablet/desktop.
- **Ngữ văn** (`examId` truyền vào `Exam`): chọn 1 trong 6 đề, đủ toàn bộ câu theo thứ tự, đếm ngược theo `time_limit_minutes` (90').
  - Topbar sticky: tên đề + đồng hồ + nút "Danh sách câu (N)" kèm badge `done/N` + nút "Nộp bài".
  - Drawer overlay (bấm nhảy câu rồi tự đóng) thay cho sidebar.
  - Desktop >1025px: vùng làm bài rộng tối đa 1280px, 2 cột bài thơ 39% / câu hỏi 61%.

## Vercel Deploy
```json
{ "buildCommand":"npm run build", "outputDirectory":"dist",
  "rewrites":[{"source":"/(.*)","destination":"/index.html"}],
  "cleanUrls":true, "trailingSlash":false }
```
- **Auto-deploy**: push GitHub → Vercel tự build & deploy
- **KHÔNG cần Vercel CLI** — chỉ `git push` (CLI lỗi EPERM trên Windows)

## Responsive Breakpoints
- **Mobile < 768px**: palette scroll ngang, 1 cột; PassagePanel ở trên đầu, thu gọn/mở rộng được
- **≥ 768px**: SplitView 2 cột (bài thơ sticky trái | câu hỏi phải)
- **Tablet 768–1024px**: exam-split (question | timer+palette) cho môn thường
- **Desktop > 1024px**: container max 960px, keyboard shortcuts hiện

## Keyboard Shortcuts (Desktop, trong thi)
- `1`/`A`…`4`/`D` → chọn đáp án (chỉ câu trắc nghiệm)
- `←`/`↑` câu trước | `→`/`↓` câu tiếp

## PWA (iPhone/iPad/Android)
- `viewport-fit=cover`, `apple-mobile-web-app-*`, icons 180/192/512
- SW bỏ qua Firebase requests

## Thêm môn mới
1. Tạo `src/data/[ten]Questions.js` (hoặc JSON trong `src/data/subjects/` + file loader) với `subject: '[id]'`
2. Import trong `questionBank.js` → thêm vào `questionsBySubject`
3. Môn tự động hiển thị khi count > 0 (badge "Sẵn sàng")
4. Môn có văn bản đi kèm: thêm field `passage` + `examId` (xem Ngữ văn)

# Rules cho dự án: Cổng Ôn Tập Lớp 7

## Bối cảnh dự án
Đây là PWA ôn thi đa môn cho học sinh lớp 7 (con của user).
- Stack: React 19 + Vite 8 + **Firebase Firestore (Offline-First)** + Gemini 2.0 Flash
- User là phụ huynh muốn giám sát kết quả con từ xa qua Firebase Console
- Giao diện tiếng Việt, thân thiện học sinh
- Hỗ trợ đa thiết bị: Laptop, Android, iPhone, iPad

## Quy tắc code

### Tổ chức file
- Câu hỏi mới → tạo file `src/data/[subjectId]Questions.js` (KHÔNG sửa questionBank.js trực tiếp)
- Components nhận `subjectId` prop (string), không hardcode subject
- localStorage key pattern: `wrongQ_${subjectId}`

### Convention câu hỏi
- `id` PHẢI unique trên toàn bộ questionsBySubject
- `subject` PHẢI khớp với id trong `subjects.js`
- `answer` là INDEX số (0-3), không phải chữ cái
- Tiếng Việt đúng dấu trong `question` và `explanation`
- PET B1: thêm field `skill: 'reading'|'grammar'|'vocabulary'|'writing'|'listening'|'speaking'`
- Loại câu hỏi: `type: 'multiple_choice'|'calculation'|'short_essay'` (mặc định: `multiple_choice`)

### Firebase Firestore (thay Supabase)
- Config đọc từ 6 biến `VITE_FIREBASE_*` trong `.env.local`
- `isFirebaseConfigured` check TRƯỚC khi call bất kỳ Firebase function nào
- Mọi Firebase call phải có try/catch và fallback graceful
- Offline-First: Firestore SDK tự quản lý IndexedDB cache — KHÔNG cần xử lý thủ công
- `persistentMultipleTabManager` đã được cấu hình trong `firebase.js` (tránh lỗi Safari)
- Collections: `submissions`, `wrong_answers` (xem schema trong PROJECT_MEMORY.md)

### Gemini AI
- Gemini key format: `AQ.xxx` (mới) hoặc `AIza` (cũ) — đều hợp lệ
- `isGeminiConfigured` check TRƯỚC khi call AI
- Chỉ phân tích tối đa 5 câu sai (performance + quota)
- Prompt luôn bằng tiếng Việt, thân thiện HS lớp 7

### Deploy
- Build output: `dist/` (Vite)
- Vercel: tự deploy khi push lên GitHub (`dinh-np/lop7_tin_hoc`)
- Với Vercel prod: thêm 6 biến `VITE_FIREBASE_*` vào Vercel Dashboard

### Touch & Responsive
- Mọi button/option phải có `min-height: 48px` (WCAG tap target)
- Input/select phải có `font-size: 16px` (tránh Safari auto-zoom)
- Dùng class `no-select` cho các element không cần chọn text

## Skills có sẵn
Đọc trong `user_antigravity/skills/` khi cần:
- `them-cau-hoi` — thêm câu hỏi môn mới
- `firebase-firestore` — setup Firebase, xem kết quả, debug kết nối
- `deploy-vercel` — deploy lên Vercel, thêm env vars
- `gemini-ai` — debug Gemini AI

## Memory file
Xem `user_antigravity/PROJECT_MEMORY.md` để biết toàn bộ context dự án.

## Ngôn ngữ trả lời
- Mặc định tiếng Việt với user này
- Code comments có thể tiếng Anh hoặc Việt

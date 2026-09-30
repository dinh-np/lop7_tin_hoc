# Rules cho dự án: Cổng Ôn Tập Lớp 7

## Bối cảnh dự án
Đây là PWA ôn thi đa môn cho học sinh lớp 7 (con của user).
- Stack: React 19 + Vite 8 + Supabase Local + Gemini 2.0 Flash
- User là phụ huynh muốn giám sát kết quả con từ xa qua Supabase
- Giao diện tiếng Việt, thân thiện học sinh

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

### Supabase
- URL local: `http://127.0.0.1:54321` (HTTP, KHÔNG phải postgresql://)
- Key local: `sb_publishable_xxx` (KHÔNG phải JWT eyJ...)
- Mọi Supabase call phải có try/catch và fallback graceful
- `isSupabaseConfigured` check TRƯỚC khi call bất kỳ Supabase function nào

### Gemini AI
- Gemini key format: `AQ.xxx` (mới) hoặc `AIza` (cũ) — đều hợp lệ
- `isGeminiConfigured` check TRƯỚC khi call AI
- Chỉ phân tích tối đa 5 câu sai (performance + quota)
- Prompt luôn bằng tiếng Việt, thân thiện HS lớp 7

### Deploy
- Build output: `dist/` (Vite)
- Vercel: KHÔNG cần cấu hình thêm nếu `vercel.json` đúng
- Với Vercel prod: dùng Supabase Cloud, không dùng 127.0.0.1

## Skills có sẵn
Đọc trong `user_antigravity/skills/` khi cần:
- `them-cau-hoi` — thêm câu hỏi môn mới
- `supabase-local` — quản lý Supabase Local  
- `deploy-vercel` — deploy lên Vercel
- `gemini-ai` — debug Gemini AI

## Memory file
Xem `user_antigravity/PROJECT_MEMORY.md` để biết toàn bộ context dự án.

## Ngôn ngữ trả lời
- Mặc định tiếng Việt với user này
- Code comments có thể tiếng Anh hoặc Việt

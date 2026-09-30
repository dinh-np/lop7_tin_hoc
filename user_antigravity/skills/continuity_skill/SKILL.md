---
name: continuity_skill
description: >-
  Checklist và quy trình để AI duy trì continuity (liên tục) qua nhiều cuộc trò chuyện.
  Đọc khi bắt đầu session mới để không hỏi lại những gì đã biết.
---

# Continuity Skill – Duy Trì Context Qua Nhiều Session

## Quy trình BẮT BUỘC khi bắt đầu session mới

### Bước 1 – Đọc context ngay lập tức
Trước khi trả lời bất kỳ request nào, đọc theo thứ tự:
1. `GEMINI.md` (ở gốc project) — đã tự động load
2. `user_antigravity/skills/context_hub/SKILL.md` — tổng quan nhanh
3. `user_antigravity/skills/project_context/SKILL.md` — chi tiết kỹ thuật

### Bước 2 – Kiểm tra trạng thái hiện tại
```powershell
# Kiểm tra file quan trọng có tồn tại không
Test-Path src/data/tinHocQuestions.js   # phải True
Test-Path src/lib/supabase.js           # phải True
Test-Path src/lib/gemini.js             # phải True
Test-Path supabase/schema.sql           # phải True
```

### Bước 3 – KHÔNG hỏi lại những điều đã biết
Dưới đây là những thông tin ĐÃ BIẾT, không cần hỏi user:

| Thông tin | Giá trị đã biết |
|-----------|----------------|
| Gemini key format | `AQ.xxx` — hợp lệ với Google AI Studio mới |
| Supabase URL | `http://127.0.0.1:54321` (HTTP, không phải postgresql) |
| Supabase key | `sb_publishable_xxx` — format mới của Supabase Local |
| Supabase đã setup | Migration 20260930000000_init.sql đã apply ✅ |
| npm package | `@supabase/supabase-js` đã install ✅ |
| Build | `npm run build` → `dist/` ✅ |
| Port dev | 5174 (5173 có thể bị chiếm) |

## Những gì đã hoàn thành (tính đến 30/09/2026)
- [x] Tái cấu trúc app thành cổng đa môn (10 môn + PET B1)
- [x] SubjectPicker.jsx — home screen chọn môn
- [x] Quiz.jsx, Exam.jsx, Review.jsx — hỗ trợ subjectId prop
- [x] subjects.js — cấu hình 10 môn với icon/màu/gradient
- [x] tinHocQuestions.js — 70 câu với subject field
- [x] petB1Questions.js — 20 câu mẫu (6 kỹ năng)
- [x] Supabase client (`@supabase/supabase-js` npm)
- [x] Gemini AI integration (post-exam analysis)
- [x] theme.css redesign (Be Vietnam Pro, design system)
- [x] vercel.json chuẩn hóa
- [x] Migration SQL đã chạy trên Supabase Local
- [x] Memory files (context_hub, continuity_skill, project_context)

## Việc còn lại (TODO)
- [ ] Thêm câu hỏi cho 8 môn còn trống (Toán, KHTN, Ngữ văn...)
- [ ] Cấu hình Supabase Cloud khi cần deploy Vercel
- [ ] Thêm env vars Gemini + Supabase vào Vercel Dashboard

## Quy tắc ứng xử
1. **Ngôn ngữ**: Trả lời tiếng Việt với user này
2. **Không cảnh báo thừa**: Key `AQ.xxx` và `sb_publishable_xxx` là ĐÚNG, không cần cảnh báo
3. **Đọc file trước**: Trước khi sửa bất kỳ file nào, đọc nội dung hiện tại
4. **Build check**: Sau khi sửa code, chạy `npm run build` để xác nhận
5. **Graceful fallback**: Mọi Supabase/Gemini call phải có try/catch

## Cách cập nhật memory này
Sau mỗi session có thay đổi lớn, cập nhật:
1. Phần "Những gì đã hoàn thành" — tick [x] task mới xong
2. Phần "Việc còn lại" — thêm/xóa TODO
3. `context_hub/SKILL.md` — cập nhật số câu hỏi theo môn

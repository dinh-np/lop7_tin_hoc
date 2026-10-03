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
Test-Path src/data/tinHocQuestions.js         # phải True
Test-Path src/data/subjects/nguvan7.json      # phải True
Test-Path src/lib/firebase.js                 # phải True
Test-Path src/lib/gemini.js                   # phải True
```

### Bước 3 – KHÔNG hỏi lại những điều đã biết
Dưới đây là những thông tin ĐÃ BIẾT, không cần hỏi user:

| Thông tin | Giá trị đã biết |
|-----------|----------------|
| Gemini key format | `AQ.xxx` — hợp lệ với Google AI Studio mới |
| Database | Firebase Firestore, project `sotayontap-4c27e` (Supabase đã bỏ) |
| Firebase | Đã test OK local + Vercel; 6 biến `VITE_FIREBASE_*` đã có trên Vercel |
| Build | `npm run build` → `dist/` ✅ |
| Deploy | `git push` lên `main` → Vercel tự deploy |
| Port dev | 5174 (5173 có thể bị chiếm) |

## Những gì đã hoàn thành (tính đến 03/10/2026)
- [x] Tái cấu trúc app thành cổng đa môn (10 môn + PET B1)
- [x] SubjectPicker, Quiz, Exam, Review — hỗ trợ `subjectId` (+ `part` mcq/essay)
- [x] Migrate Supabase → Firebase Firestore (Offline-First)
- [x] Gemini AI integration (post-exam analysis, chỉ câu TN)
- [x] Dữ liệu: Tin học (70), PET B1 (20), KHTN (64), LS&ĐL (55), GDCD (46), Ngữ văn (53 câu / 6 đề)
- [x] Tách Phần Trắc nghiệm / Tự luận; textarea tự giãn; tự đánh giá "Đã nắm / Cần ôn"
- [x] Ngữ văn: SplitView 2 cột (bài thơ sticky), keyPoints tự chấm
- [x] Ngữ văn: Thi thử theo từng đề (90', không shuffle), topbar sticky + drawer danh sách câu, split 39/61
- [x] theme.css redesign, vercel.json chuẩn hóa, PWA
- [x] Memory files (PROJECT_MEMORY, context_hub, continuity_skill, project_context)

## Việc còn lại (TODO)
- [ ] Thêm câu hỏi cho Toán, Tiếng Anh, Công nghệ, GD địa phương
- [ ] Ngữ văn: thi thử theo đề chưa lưu submission riêng theo `examId` (Firestore chỉ lưu subject)
- [ ] Cân nhắc code-split (bundle > 500 kB)

## Quy tắc ứng xử
1. **Ngôn ngữ**: Trả lời tiếng Việt với user này
2. **Không cảnh báo thừa**: Key `AQ.xxx` là ĐÚNG, không cần cảnh báo
3. **Đọc file trước**: Trước khi sửa bất kỳ file nào, đọc nội dung hiện tại
4. **Build check**: Sau khi sửa code, chạy `npm run build` để xác nhận
5. **Graceful fallback**: Mọi Firebase/Gemini call phải có try/catch và check `isFirebaseConfigured` / `isGeminiConfigured`

## Cách cập nhật memory này
Sau mỗi session có thay đổi lớn, cập nhật:
1. Phần "Những gì đã hoàn thành" — tick [x] task mới xong
2. Phần "Việc còn lại" — thêm/xóa TODO
3. `context_hub/SKILL.md` + `PROJECT_MEMORY.md` — cập nhật số câu hỏi theo môn

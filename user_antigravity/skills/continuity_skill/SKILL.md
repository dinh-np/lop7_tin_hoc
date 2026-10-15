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

## Những gì đã hoàn thành (tính đến 15/10/2026)
- [x] Tái cấu trúc app thành cổng đa môn (10 môn + PET B1)
- [x] SubjectPicker, Quiz, Exam, Review — hỗ trợ `subjectId` (+ `part` mcq/essay/tf)
- [x] Migrate Supabase → Firebase Firestore (Offline-First)
- [x] Gemini AI integration (post-exam analysis, chỉ câu TN)
- [x] Dữ liệu hoàn thiện 9/10 môn:
  - Tin học (70), PET B1 (20), KHTN (64), LS&ĐL (55), GDCD (46), Ngữ văn (53 câu / 6 đề)
  - Toán (102 câu: 72 TN + 30 TL / 6 đề thi qua `ToanExam`)
  - Tiếng Anh (114 câu tải qua Firestore SDK `tienganh7_gki`)
  - Công nghệ (46 câu: 40 TN + 4 Đ/S + 2 TL)
- [x] Tách Phần Trắc nghiệm / Đúng & Sai / Tự luận trên giao diện Dashboard
- [x] Nâng cấp toàn diện dạng bài Đúng / Sai (`TrueFalseQuestion.jsx/.css`):
  - Bố cục 2 cột (≥768px): ngữ cảnh vàng sticky bên trái, các nhận định với nút Đúng (xanh lục) / Sai (đỏ) bên phải.
  - Phản hồi tức thì trong Luyện tập kèm giải thích "Tại sao Đúng / Sai".
  - Chấm điểm chuẩn Bộ GD&ĐT (1 ý: 0.1, 2 ý: 0.25, 3 ý: 0.5, 4 ý: 1.0) qua `lib/trueFalse.js`.
  - Tích hợp mượt mà vào Thi thử (`Exam.jsx`), Sổ tay sai (`Review.jsx`), và lưu an toàn lên Firebase.
- [x] Ngữ văn: SplitView 2 cột (bài thơ sticky), keyPoints tự chấm
- [x] Ngữ văn / Toán: Thi thử theo từng đề (chọn đề, không shuffle), topbar sticky + drawer danh sách câu
- [x] theme.css redesign, vercel.json chuẩn hóa, PWA
- [x] Memory files (PROJECT_MEMORY, context_hub, continuity_skill, project_context, them-cau-hoi)

## Việc còn lại (TODO)
- [ ] Môn Công nghệ: Tinh chỉnh sync Firestore để tải và bóc tách mảng `questions` hỗn hợp từ Firestore (nhận diện qua `type`), đồng bộ với các môn khác.
- [ ] Thêm câu hỏi cho GD địa phương (khi có đề cương).
- [ ] Cân nhắc code-split nếu bundle > 500 kB tiếp tục tăng.

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

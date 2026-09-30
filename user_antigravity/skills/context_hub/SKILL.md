---
name: context_hub
description: >-
  Hub tổng hợp toàn bộ context của dự án Cổng Ôn Tập Lớp 7.
  Đọc file này TRƯỚC TIÊN khi bắt đầu bất kỳ task nào trong project này
  để nắm đủ bối cảnh mà không cần hỏi lại user.
---

# Context Hub – Cổng Ôn Tập Lớp 7

## Dự án là gì?
PWA ôn thi **đa môn cho học sinh lớp 7** (con của user).  
User là **phụ huynh** — muốn giám sát kết quả học của con từ xa qua Supabase.

## Tech Stack (hiện tại đang dùng)
| Thành phần | Version | Ghi chú |
|------------|---------|---------|
| React | 19 | |
| Vite | 8 | build output → `dist/` |
| @supabase/supabase-js | latest | npm package, KHÔNG dùng esm.sh |
| Gemini | 2.0 Flash | `gemini-2.0-flash` |
| CSS | Vanilla | Be Vietnam Pro font, Google Fonts |

## File quan trọng nhất
| File | Vai trò |
|------|---------|
| `src/data/subjects.js` | Danh sách 10 môn + PET B1 |
| `src/data/questionBank.js` | Index, export `getQuestionsForSubject(id)` |
| `src/data/tinHocQuestions.js` | 70 câu Tin học (có `subject:'tin_hoc'`) |
| `src/data/petB1Questions.js` | 20 câu PET B1 mẫu |
| `src/lib/supabase.js` | Client wrapper, graceful fallback |
| `src/lib/gemini.js` | `diagnoseWrongAnswer()`, `batchDiagnose()` |
| `src/components/SubjectPicker.jsx` | Home screen – chọn môn |
| `src/components/Exam.jsx` | Thi thử + Gemini AI analysis sau nộp |
| `vercel.json` | SPA rewrites + outputDirectory:dist |
| `supabase/schema.sql` | DDL bảng sessions + view subject_stats |
| `supabase/migrations/20260930000000_init.sql` | Migration đã chạy |
| `GEMINI.md` | Rules tự động load mỗi session |

## .env.local (các giá trị thực)
```
VITE_GEMINI_API_KEY=AQ.Ab8RN6IBE8LRCpmadiirZskoT4dBBrMoAFrE42figOK0tP-jYw
VITE_SUPABASE_URL=http://127.0.0.1:54321
VITE_SUPABASE_ANON_KEY=sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH
```
> ⚠️ Key `AQ.xxx` là format MỚI của Google AI Studio — hoàn toàn hợp lệ.

## Môn học & trạng thái câu hỏi
| id | Môn | Câu hỏi |
|----|-----|---------|
| `tin_hoc` | Tin học 💻 | ✅ 70 câu |
| `pet_b1` | PET B1 English 🎓 | ✅ 20 câu mẫu |
| `toan` | Toán 📐 | ⏳ placeholder |
| `khoa_hoc_tu_nhien` | KHTN 🔬 | ⏳ placeholder |
| `ngu_van` | Ngữ văn 📖 | ⏳ placeholder |
| `tieng_anh` | Tiếng Anh 🇬🇧 | ⏳ placeholder |
| `lich_su_dia_li` | Lịch sử & Địa lí 🗺️ | ⏳ placeholder |
| `gdcd` | GDCD 🏛️ | ⏳ placeholder |
| `cong_nghe` | Công nghệ ⚙️ | ⏳ placeholder |
| `gd_dia_phuong` | GD địa phương 🏠 | ⏳ placeholder |

## Luồng hoạt động app
```
Home (SubjectPicker)
  → chọn môn → SubjectView
      ├─ Tab "Luyện Tập"  → Quiz.jsx  (lọc theo topic, lưu sai vào localStorage)
      ├─ Tab "Thi Thử"    → Exam.jsx  (random 30 câu, 45', sau nộp → Gemini AI)
      └─ Tab "Sổ Tay Sai" → Review.jsx (đọc wrongQ_${subjectId} từ localStorage)
```

## Supabase Local – thông tin đang chạy
- Studio: http://127.0.0.1:54323  
- API: http://127.0.0.1:54321  
- Migration đã apply: `20260930000000_init.sql` ✅  
- Bảng đã tạo: `sessions`, view: `subject_stats`  
- Cần Docker Desktop đang chạy

## Các skills có sẵn
- `continuity_skill` — checklist mỗi đầu session
- `project_context` — context chi tiết từng thành phần
- `them-cau-hoi` — thêm câu hỏi môn mới
- `supabase-local` — quản lý Supabase Local
- `deploy-vercel` — deploy lên Vercel
- `gemini-ai` — debug Gemini AI

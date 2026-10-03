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
User là **phụ huynh** — muốn giám sát kết quả học của con từ xa qua **Firebase Console** (Firestore).

## Tech Stack (hiện tại)
| Thành phần | Version | Ghi chú |
|------------|---------|---------|
| React | 19 | |
| Vite | 8 | build output → `dist/` |
| Firebase Firestore | web SDK | Offline-First, project `sotayontap-4c27e` |
| Gemini | 2.0 Flash | `gemini-2.0-flash` |
| react-markdown + remark-gfm | | render đáp án tự luận |
| CSS | Vanilla | Be Vietnam Pro font |

> Supabase đã bị thay thế bằng Firebase (thư mục `supabase/` chỉ để tham khảo).

## File quan trọng nhất
| File | Vai trò |
|------|---------|
| `src/data/subjects.js` | Danh sách 10 môn + PET B1 |
| `src/data/questionBank.js` | Index, `getQuestionsForSubject(id, part)`, `hasEssayQuestions()` |
| `src/data/*Questions.js` | Loader từng môn; một số đọc JSON trong `src/data/subjects/` |
| `src/data/subjects/nguvan7.json` | 6 đề Ngữ văn (reading_passage + câu hỏi) |
| `src/lib/firebase.js` | `saveSubmission()`, `saveWrongAnswers()`, `isFirebaseConfigured` |
| `src/lib/gemini.js` | `diagnoseWrongAnswer()`, `batchDiagnose()` |
| `src/components/Exam.jsx` | Thi thử (+ chế độ compact theo `examId` cho Ngữ văn) |
| `src/components/NguVanExam.jsx` | Chọn đề Ngữ văn |
| `src/components/SplitView.jsx`, `PassagePanel.*` | Bố cục 2 cột bài thơ / câu hỏi |
| `src/components/QuestionRenderer.jsx` | Render 3 loại câu hỏi (+ keyPoints) |
| `vercel.json` | SPA rewrites + outputDirectory:dist |
| `GEMINI.md` | Rules tự động load mỗi session |

## .env.local
Chứa `VITE_GEMINI_API_KEY` (dạng `AQ.xxx`) và 6 biến `VITE_FIREBASE_*`. Không ghi giá trị thật vào tài liệu; không commit file này.
> Key `AQ.xxx` là format MỚI của Google AI Studio — hợp lệ.

## Môn học & trạng thái câu hỏi
| id | Môn | Câu hỏi |
|----|-----|---------|
| `tin_hoc` | Tin học 💻 | ✅ 70 câu |
| `pet_b1` | PET B1 English 🎓 | ✅ 20 câu mẫu |
| `khoa_hoc_tu_nhien` | KHTN 🔬 | ✅ 64 câu |
| `lich_su_dia_li` | Lịch sử & Địa lí 🗺️ | ✅ 55 câu |
| `gdcd` | GDCD 🏛️ | ✅ 46 câu |
| `ngu_van` | Ngữ văn 📖 | ✅ 53 câu tự luận (6 đề) |
| `toan` | Toán 📐 | ⏳ placeholder |
| `tieng_anh` | Tiếng Anh 🇬🇧 | ⏳ placeholder |
| `cong_nghe` | Công nghệ ⚙️ | ⏳ placeholder |
| `gd_dia_phuong` | GD địa phương 🏠 | ⏳ placeholder |

## Luồng hoạt động app
```
Home (SubjectPicker)
  → chọn môn → SubjectView
      ├─ (môn có cả TN & TL) tab "Phần Trắc nghiệm" / "Phần Tự luận"
      ├─ "Luyện Tập"  → Quiz.jsx  (lọc theo topic, lưu sai vào localStorage)
      ├─ "Thi Thử"    → Exam.jsx  (random 30 câu, 45')   | Ngữ văn → NguVanExam (chọn đề, 90')
      └─ "Sổ Tay Sai" → Review.jsx (wrongQ_${subjectId})
```

## Các skills có sẵn
- `continuity_skill` — checklist mỗi đầu session
- `project_context` — context chi tiết từng thành phần
- `them-cau-hoi` — thêm câu hỏi môn mới
- `deploy-vercel` — deploy lên Vercel
- `gemini-ai` — debug Gemini AI
- `supabase-local` — (lỗi thời; skill `firebase-firestore` trong skills.json trỏ vào thư mục này)

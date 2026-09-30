# Dự án: Cổng Ôn Tập Lớp 7

## Tổng quan
PWA ôn thi đa môn cho học sinh lớp 7. Stack: React 19 + Vite 8 + Supabase Local + Gemini AI.

## Tech Stack
- **Frontend**: React 19, Vite 8, Vanilla CSS (Be Vietnam Pro font)
- **AI**: Gemini 2.0 Flash (`VITE_GEMINI_API_KEY` — dạng `AQ.xxx`)
- **DB**: Supabase Local (`http://127.0.0.1:54321`, Publishable key `sb_publishable_xxx`)
- **Deploy**: Vercel (SPA rewrites, outputDirectory: dist)
- **PWA**: `beforeinstallprompt` event

## Cấu trúc thư mục
```
src/
├── components/
│   ├── SubjectPicker.jsx   ← màn hình home chọn môn
│   ├── Quiz.jsx            ← luyện tập (nhận prop subjectId)
│   ├── Exam.jsx            ← thi thử 45' + AI analysis sau nộp bài
│   └── Review.jsx          ← sổ tay câu sai (per-subject localStorage)
├── data/
│   ├── subjects.js         ← SUBJECTS array (10 môn + PET B1)
│   ├── questionBank.js     ← index, export getQuestionsForSubject()
│   ├── tinHocQuestions.js  ← 70 câu, subject:'tin_hoc'
│   └── petB1Questions.js   ← 20 câu mẫu PET B1
├── lib/
│   ├── gemini.js           ← diagnoseWrongAnswer(), batchDiagnose()
│   └── supabase.js         ← saveSession(), fetchSessions(), checkSupabaseStatus()
└── styles/
    └── theme.css           ← design system (CSS variables, components)
supabase/
├── schema.sql              ← DDL: bảng sessions + RLS + view subject_stats
├── migrations/
│   └── 20260930000000_init.sql
└── SETUP.md
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
{
  id: 1,                    // hoặc 'pet_1' cho PET
  subject: 'tin_hoc',       // PHẢI có subject
  topic: 'Thiết bị vào-ra',
  skill: 'reading',         // tùy chọn, dùng cho PET B1
  question: '...',
  options: ['A. ...', 'B. ...', 'C. ...', 'D. ...'],
  answer: 2,                // index 0-3
  explanation: '...',
}
```

## localStorage keys
- `wrongQ_tin_hoc` — mảng id câu sai Tin học
- `wrongQ_pet_b1` — mảng id câu sai PET B1
- Pattern: `wrongQ_${subjectId}`

## Supabase bảng sessions
```sql
id, subject, mode, score, total_questions, correct_count,
wrong_ids (JSONB), duration_seconds, created_at
```
View: `subject_stats` — thống kê trung bình theo môn

## .env.local (KHÔNG commit)
```env
VITE_GEMINI_API_KEY=AQ.xxx          ← aistudio.google.com/app/apikey
VITE_SUPABASE_URL=http://127.0.0.1:54321
VITE_SUPABASE_ANON_KEY=sb_publishable_xxx
```

## Gemini AI flow
1. Sau nộp bài thi (`Exam.jsx`) → gọi `batchDiagnose(wrongs.slice(0,5))`
2. Prompt tiếng Việt, thân thiện HS lớp 7, max 120 từ/câu
3. Model: `gemini-2.0-flash`

## Vercel deploy
```json
{ "buildCommand":"npm run build", "outputDirectory":"dist",
  "rewrites":[{"source":"/(.*)","destination":"/index.html"}],
  "cleanUrls":true, "trailingSlash":false }
```

## Thêm môn mới
1. Tạo `src/data/[ten]Questions.js` với `subject: '[id]'`
2. Import trong `questionBank.js` → thêm vào `questionsBySubject`
3. Môn tự động hiển thị trong SubjectPicker (count > 0 → badge "Sẵn sàng")

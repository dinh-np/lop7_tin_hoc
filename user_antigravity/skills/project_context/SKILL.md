---
name: project_context
description: >-
  Context kỹ thuật chi tiết từng thành phần của dự án.
  Dùng khi cần hiểu sâu về một component, data flow, hoặc API cụ thể
  trước khi thực hiện thay đổi.
---

# Project Context – Chi Tiết Kỹ Thuật

## Data Flow

```
questionBank.js (index)
  ├── tinHocQuestions.js         → 'tin_hoc'
  ├── petB1Questions.js          → 'pet_b1'
  ├── khoaHocTuNhienQuestions.js → 'khoa_hoc_tu_nhien' (subjects/khtn7.json)
  ├── lichSuDiaLiQuestions.js    → 'lich_su_dia_li'    (subjects/ls_dl7.json)
  ├── gdcdQuestions.js           → 'gdcd'              (subjects/gdcd7.json)
  ├── nguVanQuestions.js         → 'ngu_van'           (subjects/nguvan7.json, flatten 6 đề,
  │                                  mỗi câu có examId + passage)
  └── [các môn khác]             → placeholder []

getQuestionsForSubject(subjectId, part='all'|'mcq'|'essay') → Question[]
hasEssayQuestions(subjectId) → true nếu có cả TN lẫn TL

App.jsx
  └── selectedSubject state
      ├── null → <SubjectPicker onSelect={...} />
      └── subjectId
          ├── <Quiz subjectId part />
          ├── mode 'exam': subjectId==='ngu_van' ? <NguVanExam/> : <Exam subjectId part />
          └── <Review subjectId part />

NguVanExam → chọn đề → <Exam examId examTitle durationMinutes />

Quiz / Review / Exam: nội dung làm bài bọc trong <SplitView passage={q.passage}>
  (không có passage → render như cũ)
```

## localStorage Schema
```
wrongQ_tin_hoc    → [1, 5, 12, ...]     (array of question ids)
wrongQ_pet_b1     → ['pet_3', 'pet_7']
wrongQ_ngu_van    → ['v7_d1_c3', ...]
```

## Firestore Schema (thay Supabase)
```
submissions/   subject, mode, score, correct_count, wrong_count, time_spent_seconds, submitted_at
wrong_answers/ submission_id, question_id, question_text, question_topic,
               student_answer, correct_answer, explanation, error_reason_type, ai_diagnostic
```
Chi tiết xem `PROJECT_MEMORY.md`. (Supabase đã deprecated.)

## Gemini API chi tiết

### Endpoint
```
POST https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={KEY}
Content-Type: application/json

{
  "contents": [{ "parts": [{ "text": "..." }] }],
  "generationConfig": { "temperature": 0.7, "maxOutputTokens": 300 }
}
```

### Response parse
```js
data?.candidates?.[0]?.content?.parts?.[0]?.text
```

### Giới hạn trong app
- Tối đa 5 câu/lần (`wrongs.slice(0, 5)`), chỉ câu trắc nghiệm
- Delay 300ms giữa requests
- Timeout: không set (browser default)

## Component Props

### `<Quiz subjectId part />`
- Đọc questions từ `getQuestionsForSubject(subjectId, part)`
- Lọc theo `topic` (dropdown; Ngữ văn: topic = tên đề)
- Lưu sai vào `wrongQ_${subjectId}`
- Câu có `passage` → hiện bài đọc qua `SplitView`

### `<Exam subjectId part examId? examTitle? durationMinutes? />`
- Không `examId`: random 30 câu, timer 45 phút (đỏ <1', vàng <5')
- Có `examId` (Ngữ văn): lọc đúng đề, giữ thứ tự, timer `durationMinutes`,
  layout compact (topbar sticky + drawer danh sách câu, không sidebar)
- Sau nộp: `saveSubmission()` + `saveWrongAnswers()` + `batchDiagnose()` (chỉ câu TN)
- Tự luận tính đúng khi HS bấm "Tôi đã nắm được"

### `<NguVanExam subjectId />`
- 6 thẻ chọn đề (tên, thời gian, số câu từ `nguVanTestMeta`)
- "← Chọn đề khác" có confirm

### `<SplitView passage>` / `<PassagePanel passage>`
- ≥768px: grid 2 cột, bài thơ sticky bên trái
- <768px: bài thơ ở trên, nút Thu gọn/Mở rộng

### `<Review subjectId part />`
- Đọc `wrongQ_${subjectId}` từ localStorage
- Trả lời đúng → xóa khỏi danh sách
- Nút "Xóa tất cả" có confirm dialog

### `<SubjectPicker onSelect={fn} />`
- Hiển thị SUBJECTS array từ subjects.js
- Badge "Sẵn sàng" nếu count > 0
- Badge "Sắp có" (xám) nếu count = 0
- PET B1 card có style tối đặc biệt

## CSS Design System (theme.css)

### CSS Variables
```css
--primary: #2563eb      /* blue */
--success: #16a34a      /* green */
--danger: #dc2626       /* red */
--warning: #d97706      /* amber */
--bg: #f0f4f8           /* page background */
--surface: #ffffff      /* card background */
--radius-lg: 16px
--shadow: 0 4px 16px rgba(0,0,0,.08)
```

### Component classes
- `.card` — container trắng có border, shadow
- `.option-btn` — nút lựa chọn câu hỏi
- `.option-btn.correct` / `.incorrect` — sau khi trả lời
- `.ai-panel` — khung tím gradient cho Gemini AI
- `.score-circle.pass` / `.fail` — kết quả thi
- `.palette-btn.answered` — câu trong palette đã trả lời
- `.timer.warning` / `.danger` — đồng hồ đổi màu

## Package.json dependencies (chính)
```json
{
  "dependencies": { "react": "^19", "react-dom": "^19", "firebase": "...",
                    "react-markdown": "...", "remark-gfm": "..." },
  "devDependencies": { "@vitejs/plugin-react": "...", "vite": "^8", "oxlint": "..." }
}
```

## Git & Deploy

### Repository
- GitHub: `dinh-np/lop7_tin_hoc`
- Vercel project: `lop7-tin-hoc`

### .gitignore (đã thêm)
```
node_modules/
dist/
*.local          ← .env.local không bị push
user_data/       ← file docx riêng tư
supabase/.branches
supabase/.temp
.vercel
```

### Deploy checklist
1. `npm run build` → 0 errors
2. `git push` → Vercel auto-deploy
3. Vercel Dashboard → có đủ `VITE_GEMINI_API_KEY` + 6 biến `VITE_FIREBASE_*`
4. Kiểm tra collection `submissions` trên Firebase Console sau khi thi thử

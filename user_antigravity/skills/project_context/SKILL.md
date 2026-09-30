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
  ├── tinHocQuestions.js  → subject: 'tin_hoc'
  ├── petB1Questions.js   → subject: 'pet_b1'
  └── [các môn khác]      → placeholder []

getQuestionsForSubject(subjectId) → Question[]

App.jsx
  └── selectedSubject state
      ├── null → <SubjectPicker onSelect={setSelectedSubject} />
      └── 'tin_hoc' | 'pet_b1' | ...
          ├── <Quiz subjectId={selectedSubject} />
          ├── <Exam key={`exam-${selectedSubject}`} subjectId={selectedSubject} />
          └── <Review subjectId={selectedSubject} />
```

## localStorage Schema
```
wrongQ_tin_hoc    → [1, 5, 12, ...]     (array of question ids)
wrongQ_pet_b1     → ['pet_3', 'pet_7']
wrongQ_toan       → []
```

## Supabase Schema chi tiết

### Bảng `sessions`
```sql
id               BIGSERIAL PRIMARY KEY
subject          TEXT NOT NULL              -- foreign key logically to subjects.id
mode             TEXT NOT NULL              -- 'practice' | 'exam'
score            NUMERIC(4,2)               -- 0.00 to 10.00
total_questions  INT
correct_count    INT
wrong_ids        JSONB DEFAULT '[]'         -- array: [1, 5, 'pet_3', ...]
duration_seconds INT
created_at       TIMESTAMPTZ DEFAULT NOW()
```

### View `subject_stats`
```sql
SELECT subject, COUNT(*) total_sessions, AVG(score) avg_score,
       MAX(score) best_score, MIN(score) worst_score,
       SUM(correct_count) total_correct,
       SUM(total_questions) total_questions_answered,
       MAX(created_at) last_session
FROM sessions GROUP BY subject ORDER BY last_session DESC;
```

### RLS Policies
- SELECT: `USING (true)` — bố/mẹ có thể xem tất cả
- INSERT: `WITH CHECK (true)` — app của con có thể insert

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
- Tối đa 5 câu/lần (`wrongs.slice(0, 5)`)
- Delay 300ms giữa requests
- Timeout: không set (browser default)

## Component Props

### `<Quiz subjectId="tin_hoc" />`
- Đọc questions từ `getQuestionsForSubject(subjectId)`
- Lọc theo `topic` (dropdown)
- Lưu sai vào `wrongQ_${subjectId}`
- Progress bar theo index hiện tại

### `<Exam subjectId="tin_hoc" />`
- Random 30 câu (hoặc tất cả nếu < 30)
- Timer 45 phút (đỏ khi < 1 phút, vàng khi < 5 phút)
- Sau nộp: gọi `saveSession()` + `batchDiagnose()`
- AI analysis hiển thị per câu sai

### `<Review subjectId="tin_hoc" />`
- Đọc `wrongQ_${subjectId}` từ localStorage
- Trả lời đúng → xóa khỏi danh sách
- Progress bar màu đỏ→cam
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

## Package.json dependencies
```json
{
  "dependencies": {
    "react": "^19.2.8",
    "react-dom": "^19.2.8",
    "@supabase/supabase-js": "latest"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^6.1.1",
    "vite": "^8.3.0",
    "oxlint": "^1.81.0"
  }
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
3. Vercel Dashboard → thêm env vars (Gemini key + Supabase Cloud)
4. Kiểm tra table `sessions` trên Supabase Cloud sau khi thi thử

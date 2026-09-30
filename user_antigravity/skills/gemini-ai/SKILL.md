---
name: gemini-ai
description: >-
  Hướng dẫn về tích hợp Gemini AI trong dự án: cách hoạt động, cấu hình,
  debug. Dùng khi AI không hoạt động hoặc cần thay đổi prompt/model.
---

# Skill: Gemini AI – Tích hợp & Debug

## Cấu hình

```env
# .env.local
VITE_GEMINI_API_KEY=AQ.xxx...    # lấy tại aistudio.google.com/app/apikey
```

> **Lưu ý**: Key có thể bắt đầu bằng `AQ.` (format mới) hoặc `AIza` (format cũ) – đều hợp lệ.

## File tích hợp: `src/lib/gemini.js`

### Functions xuất ra

```js
// Phân tích 1 câu sai
diagnoseWrongAnswer(question, studentAnswer)
  → Promise<string>  // văn bản tiếng Việt

// Phân tích hàng loạt (max 5 câu, có delay 300ms giữa requests)
batchDiagnose(wrongQuestions)
  → Promise<{ [questionId]: string }>

// Kiểm tra key có được set không
isGeminiConfigured
  → boolean
```

### Cách dùng trong component

```jsx
import { batchDiagnose, isGeminiConfigured } from '../lib/gemini';

// Sau khi nộp bài:
if (isGeminiConfigured && wrongs.length > 0) {
  const analyses = await batchDiagnose(wrongs.slice(0, 5));
  setAiAnalyses(analyses);
}
```

## Model & Endpoint

- **Model**: `gemini-2.0-flash`
- **Endpoint**: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`
- **Temperature**: 0.7
- **Max tokens**: 300

## Prompt template (tiếng Việt)

```
Bạn là gia sư môn [subject] cho học sinh lớp 7.
Câu hỏi: [question]
Học sinh đã chọn: [wrongOption]
Đáp án đúng: [correctOption]

Hãy phân tích ngắn gọn (3-5 câu) bằng tiếng Việt:
1. Tại sao học sinh có thể đã chọn sai đáp án này?
2. Khái niệm cốt lõi học sinh cần nhớ...
3. Một mẹo nhỏ hoặc cách ghi nhớ dễ hơn.
(max 120 từ, thân thiện, khích lệ)
```

## Thay đổi model

Trong `src/lib/gemini.js`, line 3:
```js
const GEMINI_MODEL = 'gemini-2.0-flash';
// Đổi thành: 'gemini-1.5-pro', 'gemini-2.0-flash-lite', ...
```

## Debug

**Kiểm tra trong browser console:**
```js
// Test Gemini key trực tiếp
const resp = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
  { method:'POST', headers:{'Content-Type':'application/json'},
    body: JSON.stringify({contents:[{parts:[{text:'Hello'}]}]}) }
);
console.log(await resp.json());
```

## Troubleshooting

| Lỗi | Giải pháp |
|-----|-----------|
| "Chưa cấu hình Gemini API key" | Thêm `VITE_GEMINI_API_KEY` vào `.env.local`, restart dev server |
| 400 API key not valid | Kiểm tra key tại aistudio.google.com – tạo key mới |
| 429 Quota exceeded | Chờ 1 phút, hoặc nâng quota tại Google Cloud Console |
| AI panel không hiện | Kiểm tra `isGeminiConfigured` = true trong browser console |

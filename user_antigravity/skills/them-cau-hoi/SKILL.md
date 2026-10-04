---
name: them-cau-hoi
description: >-
  Hướng dẫn thêm câu hỏi mới cho một môn học vào ngân hàng câu hỏi.
  Dùng khi user muốn thêm câu hỏi Toán, Khoa học, Ngữ văn, hay bất kỳ môn nào.
---

# Skill: Thêm câu hỏi mới vào ngân hàng

## Bước 1 – Xác định môn học

Xem danh sách id môn trong `src/data/subjects.js`:
- `tin_hoc`, `toan`, `khoa_hoc_tu_nhien`, `ngu_van`, `tieng_anh`
- `lich_su_dia_li`, `gdcd`, `cong_nghe`, `gd_dia_phuong`, `pet_b1`

## Bước 2 – Tạo hoặc mở file câu hỏi

File đặt tại: `src/data/[subjectId]Questions.js`

Ví dụ cho môn Toán: `src/data/toanQuestions.js`

## Bước 3 – Cấu trúc câu hỏi theo loại

### Loại 1: Trắc nghiệm `multiple_choice` (mặc định)

```js
export const toanQuestions = [
  {
    id: 'toan_7_gki_01_1',           // UNIQUE toàn bộ app, dạng 'monhoc_số'
    subject: 'toan',        // PHẢI khớp với id trong subjects.js
    topic: 'Số hữu tỉ',    // Chủ đề (dùng trong dropdown lọc Quiz)
    // type: 'multiple_choice',  // có thể bỏ qua, đây là mặc định
    question: 'Nội dung câu hỏi...',
    options: [
      'A. Đáp án A',
      'B. Đáp án B',
      'C. Đáp án C',
      'D. Đáp án D',
    ],
    answer: 0,              // INDEX 0–3 của đáp án đúng (KHÔNG phải chữ cái)
    explanation: 'Giải thích tại sao đáp án đúng...', // BẮT BUỘC
    examId: 'toan7_de_01'   // (Dành riêng cho môn có cấu trúc đề thi, VD: Toán, Ngữ Văn)
  },
];
```

**Cho PET B1**, thêm field `skill`:
```js
skill: 'reading',  // 'reading' | 'grammar' | 'vocabulary' | 'writing' | 'listening' | 'speaking'
```

### Loại 2: Tính toán `calculation`

```js
{
  id: 'toan_calc_1',
  subject: 'toan',
  topic: 'Phương trình bậc nhất',
  type: 'calculation',
  question: 'Giải phương trình: 2x + 5 = 11',
  options: ['A. x = 2', 'B. x = 3', 'C. x = 4', 'D. x = 8'],  // tùy chọn
  answer: 1,
  solution: 'Bước 1: 2x = 11 - 5 = 6\nBước 2: x = 6 ÷ 2 = 3',  // hiện khi toggle
  explanation: 'Chuyển vế hằng số rồi chia cả hai vế cho hệ số của x.',
}
```

### Loại 3: Tự luận ngắn `short_essay`

```js
{
  id: 'van_essay_1',
  subject: 'ngu_van',
  topic: 'Viết đoạn văn',
  type: 'short_essay',
  question: 'Viết đoạn văn ngắn (5-7 câu) nêu cảm nhận về mùa thu.',
  modelAnswer: 'Mùa thu là mùa của lá vàng rơi...',  // reveal khi bấm nút
  explanation: 'Đoạn văn cần có: mở đoạn, phát triển ý, kết đoạn.',
}
```

**Tự luận có bài đọc hiểu (Ngữ văn)** — thêm `keyPoints` (ý chính để HS tự chấm) và:
```js
passage: '...văn bản...',   // hiện ở PassagePanel/SplitView
examId: 'van7_de_01',       // nhóm câu theo đề; Exam lọc theo examId, giữ thứ tự
keyPoints: ['Ý 1', 'Ý 2'],
```

## Cách nạp từ file JSON (mẫu đang dùng)

Dữ liệu lớn đặt tại `src/data/subjects/[ten].json` hoặc `.js`, loader `src/data/[ten]Questions.js` chuẩn hóa:
```js
import data from './subjects/gdcd7.json';
export const gdcdQuestions = data.questions.map((q) => ({ ...q, subject: 'gdcd' }));
```
Môn theo đề (Ngữ văn, Toán): JSON/JS là mảng N đề → `flatMap` và gắn `topic`, `examId`, `passage` (xem `nguVanQuestions.js`, `toanQuestions.js`).

Môn có cả trắc nghiệm lẫn tự luận sẽ tự hiện 2 tab Trắc nghiệm / Tự luận (`hasEssayQuestions`). Môn thi theo đề sẽ dùng màn hình `ExamPicker` (như `ToanExam`, `NguVanExam`).

## Bước 4 – Đăng ký vào questionBank.js

Mở `src/data/questionBank.js` và:

```js
// 1. Import file mới
import { toanQuestions } from './toanQuestions';

// 2. Thêm vào questionsBySubject:
export const questionsBySubject = {
  tin_hoc: tinHocQuestions,
  toan: toanQuestions,      // ← thêm vào đây
  // ...
};
```

## Bước 5 – Kiểm tra & Deploy

```bash
npm run build   # phải 0 lỗi
git add -A
git commit -m "feat: thêm X câu hỏi môn Toán"
git push        # Vercel tự deploy
```

Mở app → Home → card môn vừa thêm → badge **"Sẵn sàng"** xuất hiện.

## Lưu ý quan trọng

- `id` phải **UNIQUE** trong toàn bộ questionsBySubject (không trùng giữa các môn)
- `answer` là **INDEX** (0, 1, 2, 3), không phải chữ cái A, B, C, D
- `explanation` là **bắt buộc** — Gemini AI dùng để bổ sung phân tích
- `QuestionRenderer.jsx` tự động chọn UI đúng theo `type`

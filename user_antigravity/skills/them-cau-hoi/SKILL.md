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

## Bước 3 – Cấu trúc câu hỏi bắt buộc

```js
export const toanQuestions = [
  {
    id: 'toan_1',           // UNIQUE, dạng 'monhoc_số'
    subject: 'toan',        // PHẢI khớp với id trong subjects.js
    topic: 'Số hữu tỉ',    // Chủ đề (dùng trong dropdown lọc Quiz)
    question: 'Nội dung câu hỏi...',
    options: [
      'A. Đáp án A',
      'B. Đáp án B',
      'C. Đáp án C',
      'D. Đáp án D',
    ],
    answer: 0,              // Index 0–3 của đáp án đúng
    explanation: 'Giải thích tại sao đáp án đúng...',
  },
];
```

**Cho PET B1**, thêm field `skill`:
```js
skill: 'reading',  // 'reading' | 'grammar' | 'vocabulary' | 'writing' | 'listening' | 'speaking'
```

## Bước 4 – Đăng ký vào questionBank.js

Mở `src/data/questionBank.js` và:

```js
// 1. Import file mới
import { toanQuestions } from './toanQuestions';

// 2. Xóa dòng placeholder (nếu có):
// export const toanQuestions = [];

// 3. Thêm vào questionsBySubject:
export const questionsBySubject = {
  tin_hoc: tinHocQuestions,
  toan: toanQuestions,      // ← thêm vào đây
  // ...
};
```

## Bước 5 – Kiểm tra

```bash
npm run build   # phải 0 lỗi
```

Mở app → Home → card môn vừa thêm → badge "Sẵn sàng" xuất hiện.

## Lưu ý
- `id` phải UNIQUE trong toàn bộ questionsBySubject
- `answer` là INDEX (0, 1, 2, 3), không phải chữ cái
- `explanation` là bắt buộc (Gemini AI dùng để bổ sung phân tích)

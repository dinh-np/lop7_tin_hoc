---
name: firebase-firestore
description: >-
  Hướng dẫn setup, kết nối và truy vấn Firebase Firestore cho dự án (thay Supabase).
  Dùng khi cần xem kết quả thi của con, debug kết nối, hoặc cấu hình Firebase mới.
---

# Skill: Firebase Firestore – Offline-First Setup & Quản lý

> **Đã migrate từ Supabase Local** (2026-10-02). File `src/lib/supabase.js` cũ đã bị xóa,
> thay bằng `src/lib/firebase.js`.

## Lấy Firebase Config

1. Vào [Firebase Console](https://console.firebase.google.com)
2. Tạo project (hoặc mở project hiện có)
3. **Project Settings → General → Your apps → Web app** → Copy `firebaseConfig`
4. **Bật Firestore**: Firestore Database → Create database → Start in **test mode**

## Cấu hình .env.local

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=ten-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=ten-project
VITE_FIREBASE_STORAGE_BUCKET=ten-project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc...
```

⚠️ **Vercel production**: Thêm 6 biến `VITE_FIREBASE_*` vào **Vercel Dashboard → Settings → Environment Variables**.

## Collections Firestore

### `submissions` — Kết quả mỗi lần thi
```
test_id            string | null
subject            string   — 'tin_hoc', 'pet_b1', ...
mode               string   — 'practice' | 'exam'
score              number   — 0.00 – 10.00
correct_count      number
wrong_count        number
time_spent_seconds number
submitted_at       Timestamp (serverTimestamp)
```

### `wrong_answers` — Chi tiết câu sai
```
submission_id      string
test_id            string | null
question_id        string | number
question_text      string
question_topic     string
student_answer     number   — index 0-3, hoặc -1 nếu bỏ trống
correct_answer     number
explanation        string
error_reason_type  null (để AI phân tích sau)
ai_diagnostic      null
submitted_at       Timestamp
```

## API từ src/lib/firebase.js

```js
import {
  saveSubmission,       // lưu kết quả thi → trả về submissionId
  saveWrongAnswers,     // lưu chi tiết câu sai
  fetchSubmissions,     // lấy 20 bài nộp gần nhất (cho phụ huynh)
  checkFirebaseStatus,  // kiểm tra kết nối
  isFirebaseConfigured, // boolean
} from './src/lib/firebase.js';

// Kiểm tra trong browser console
const status = await checkFirebaseStatus();
console.log(status); // { connected: true } hoặc { connected: false, reason: '...' }

// Xem kết quả gần nhất
const sessions = await fetchSubmissions(10);
console.table(sessions);
```

## Xem kết quả thi của con

**Cách 1 – Firebase Console (trực quan nhất):**
1. Vào https://console.firebase.google.com → Firestore Database
2. Collection `submissions` → xem theo `submitted_at`
3. Collection `wrong_answers` → filter theo `submission_id`

**Cách 2 – Browser console trên app:**
```js
const { fetchSubmissions } = await import('/src/lib/firebase.js');
const data = await fetchSubmissions(20);
console.table(data.map(d => ({
  subject: d.subject,
  score: d.score,
  correct: d.correct_count,
  wrong: d.wrong_count,
  time: d.time_spent_seconds + 's',
  at: d.submitted_at?.toDate?.()
})));
```

## Offline-First hoạt động thế nào

```
Online:  App → Firestore SDK → IndexedDB cache + Cloud Firestore
Offline: App → Firestore SDK → IndexedDB cache (pending writes queue)
         Khi có mạng → SDK tự sync pending writes lên Cloud
```

- `persistentLocalCache` → lưu data vào IndexedDB (không phải memory)
- `persistentMultipleTabManager` → tránh lỗi `failed-precondition` khi mở nhiều tab trên Safari/iPadOS
- Service Worker bỏ qua Firebase requests → để SDK tự quản lý offline

## Security Rules (Production)

```javascript
// firestore.rules — thêm sau khi test xong
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // submissions: chỉ write, không read từ client (phụ huynh dùng Admin SDK)
    match /submissions/{id} {
      allow create: if true;
      allow read, update, delete: if false;
    }
    match /wrong_answers/{id} {
      allow create: if true;
      allow read, update, delete: if false;
    }
  }
}
```

## Troubleshooting

| Lỗi | Giải pháp |
|-----|-----------|
| `isFirebaseConfigured = false` | Kiểm tra `.env.local` có đủ 6 biến `VITE_FIREBASE_*` không |
| `failed-precondition` | Đã được xử lý bởi `persistentMultipleTabManager` — nếu vẫn xảy ra, hard-refresh browser |
| Data không sync | Kiểm tra Firestore Rules không block write; xem Network tab |
| Build lỗi | Chạy `npm run build` local, kiểm tra import paths |
| Vercel không có Firebase data | Thêm 6 biến `VITE_FIREBASE_*` vào Vercel Dashboard |

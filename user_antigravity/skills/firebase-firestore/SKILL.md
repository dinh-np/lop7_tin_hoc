---
name: firebase-firestore
description: >-
  Hướng dẫn setup, kết nối và truy vấn Firebase Firestore cho dự án (thay Supabase).
  Dùng khi cần xem kết quả thi của con, debug kết nối, hoặc cấu hình Firebase mới.
---

# Skill: Firebase Firestore – Offline-First Setup & Quản lý

> **Đã migrate từ Supabase Local** (2026-10-02).
> File `src/lib/supabase.js` cũ đã bị xóa, thay bằng `src/lib/firebase.js`.

## Firebase Project hiện tại

| Thông số | Giá trị |
|----------|---------|
| Project ID | `sotayontap-4c27e` |
| Console | https://console.firebase.google.com/project/sotayontap-4c27e/firestore |
| Trạng thái | ✅ Đã kết nối & test thành công (2026-10-02) |

## Lấy Firebase Config (khi setup lại / máy mới)

1. Vào [Firebase Console](https://console.firebase.google.com/project/sotayontap-4c27e)
2. **⚙️ Project Settings → General → Your apps → Web app** → Copy `firebaseConfig`
3. Điền vào `.env.local` theo mẫu dưới đây

## Cấu hình .env.local

```env
VITE_FIREBASE_API_KEY=AIzaSyBErjaGYnTDRHYOJlMhqGx2FMi6-fTwu3Y
VITE_FIREBASE_AUTH_DOMAIN=sotayontap-4c27e.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=sotayontap-4c27e
VITE_FIREBASE_STORAGE_BUCKET=sotayontap-4c27e.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=703994711311
VITE_FIREBASE_APP_ID=1:703994711311:web:92a7684bb4b5018d5fc27a
```

⚠️ **Vercel production**: 6 biến `VITE_FIREBASE_*` đã được thêm vào Vercel Dashboard (✅ 2026-10-02).

## Collections Firestore

### `submissions` — Kết quả mỗi lần thi
```
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
question_id        string | number
question_text      string
question_topic     string
student_answer     number   — index 0-3, -1 nếu bỏ trống
correct_answer     number
explanation        string
error_reason_type  null
ai_diagnostic      null
submitted_at       Timestamp
```

## API từ src/lib/firebase.js

```js
import {
  saveSubmission,       // lưu kết quả thi → trả về submissionId
  saveWrongAnswers,     // lưu chi tiết câu sai (max 20)
  fetchSubmissions,     // lấy N bài nộp gần nhất
  checkFirebaseStatus,  // kiểm tra kết nối { connected, reason }
  isFirebaseConfigured, // boolean — check trước khi gọi bất kỳ function nào
} from './src/lib/firebase.js';
```

## Xem kết quả thi của con

**Cách 1 – Firebase Console (trực quan nhất):**
1. Vào https://console.firebase.google.com/project/sotayontap-4c27e/firestore/data/submissions
2. Xem theo cột `submitted_at` (mới nhất trên đầu)
3. Click vào document để xem chi tiết

**Cách 2 – Browser console trên app đang chạy:**
```js
// Paste vào Console của browser (F12)
const { fetchSubmissions } = await import('/src/lib/firebase.js');
const data = await fetchSubmissions(20);
console.table(data.map(d => ({
  subject: d.subject,
  score: d.score,
  correct: d.correct_count,
  wrong: d.wrong_count,
  time: d.time_spent_seconds + 's',
  at: d.submitted_at?.toDate?.()?.toLocaleString('vi-VN')
})));
```

**Cách 3 – Kiểm tra kết nối nhanh:**
```js
// Trong browser console
const { checkFirebaseStatus } = await import('/src/lib/firebase.js');
console.log(await checkFirebaseStatus());
// → { connected: true } nếu OK
```

## Offline-First & Data Sync hoạt động thế nào

```
Online:  App → Firestore SDK → IndexedDB cache + Cloud Firestore (sync)
Offline: App → Firestore SDK → IndexedDB cache (pending writes queue)
         Khi có mạng → SDK tự sync pending writes lên Cloud
```

- **Đồng bộ dữ liệu đề thi mới**:
  Hàm `fetchSubjectDataFromFirestore(testId)` sử dụng `getDocFromServer` để ưu tiên fetch dữ liệu nóng từ Cloud (bỏ qua cache). Nếu không có mạng, fallback về `getDoc` lấy từ IndexedDB.
  Hàm `syncSubjectData` đắp trực tiếp mảng `questions` từ Firebase vào UI (không merge chắp vá). Tự động chạy khi user chọn môn học hoặc bấm "🔄 Đồng bộ đề mới".

- **Quản lý Cache**:
  - `persistentLocalCache` → lưu data vào IndexedDB
  - `persistentMultipleTabManager` → tránh lỗi `failed-precondition` trên Safari/iPadOS
  - `navigator.storage.persist()` (trong `storagePersist.js`) → ngăn Apple iOS (WebKit) tự ý xóa IndexedDB khi Safari hết dung lượng.
  - Service Worker bỏ qua Firebase requests → để SDK tự quản lý offline

## Security Rules gợi ý (Production)

```javascript
// Thêm vào Firestore Rules khi muốn bảo mật production
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /submissions/{id} {
      allow create: if true;    // app ghi được
      allow read, update, delete: if false;  // chỉ phụ huynh qua Admin SDK
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
| `isFirebaseConfigured = false` | Kiểm tra `.env.local` có đủ 6 biến `VITE_FIREBASE_*`, restart dev server |
| `failed-precondition` | Hard-refresh browser (Ctrl+Shift+R) — đã được xử lý bởi `persistentMultipleTabManager` |
| Data không xuất hiện trên Vercel | Kiểm tra 6 biến `VITE_FIREBASE_*` trong Vercel Dashboard → Settings → Env Vars |
| Firestore Rules chặn | Đặt tạm thời về Test Mode (allow read, write: if true) để debug |
| App không lưu khi offline | Bình thường — Firestore SDK tự queue, khi có mạng sẽ sync |

---
name: deploy-vercel
description: >-
  Hướng dẫn deploy dự án lên Vercel và kiểm tra cấu hình.
  Dùng khi cần deploy mới, redeploy, hoặc thêm environment variables trên Vercel.
---

# Skill: Deploy lên Vercel

## Cấu hình hiện tại (vercel.json)

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }],
  "cleanUrls": true,
  "trailingSlash": false
}
```

## Deploy lần đầu

```powershell
# Cài Vercel CLI (nếu chưa có)
npm i -g vercel

# Deploy
vercel --prod
```

## Redeploy sau khi sửa code

```powershell
# Commit và push → Vercel tự động deploy (CI/CD)
git add -A
git commit -m "mô tả thay đổi"
git push
```

## Environment Variables trên Vercel

⚠️ `.env.local` KHÔNG được push lên GitHub. Phải thêm tay trên Vercel Dashboard.

**Vercel Dashboard → Project → Settings → Environment Variables:**

| Key | Environments |
|-----|-------------|
| `VITE_GEMINI_API_KEY` | Production, Preview |
| `VITE_FIREBASE_API_KEY` | Production, Preview |
| `VITE_FIREBASE_AUTH_DOMAIN` | Production, Preview |
| `VITE_FIREBASE_PROJECT_ID` | Production, Preview |
| `VITE_FIREBASE_STORAGE_BUCKET` | Production, Preview |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Production, Preview |
| `VITE_FIREBASE_APP_ID` | Production, Preview |

> **Lưu ý**: Dùng **Firebase Cloud** (không phải local). Sau khi thêm biến, phải **Redeploy** để áp dụng.

## Kiểm tra sau deploy

1. Truy cập URL Vercel → app load được không
2. Mở DevTools → Application → Service Workers → kiểm tra SW đang active
3. Chọn môn Tin học → **Thi Thử** → Nộp bài
4. Kiểm tra AI phân tích xuất hiện (xác nhận `VITE_GEMINI_API_KEY` hoạt động)
5. Vào Firebase Console → Firestore → collection `submissions` có record mới
6. **Test offline**: DevTools → Network → Offline → reload app → vẫn load được từ cache

## Vercel Project Info

- **Project**: `lop7-tin-hoc` (dinhnps-projects)
- **Project ID**: `prj_DWGfGysERysaMwWp4Lu7dBgkiAzB`
- **GitHub repo**: `dinh-np/lop7_tin_hoc`
- **Auto-deploy**: Mỗi push lên `main` → Vercel tự build & deploy

## Troubleshooting

| Lỗi | Giải pháp |
|-----|-----------|
| 404 Not Found | Kiểm tra `vercel.json` có `rewrites` và `outputDirectory: "dist"` |
| Build failed | Chạy `npm run build` local trước, sửa lỗi rồi push |
| Gemini không hoạt động | Kiểm tra `VITE_GEMINI_API_KEY` trong Vercel env vars |
| Firebase không lưu data | Kiểm tra 6 biến `VITE_FIREBASE_*` trong Vercel env vars |
| App không load offline | Kiểm tra Service Worker đã install; hard-refresh rồi test lại |
| Chunk size warning | Bình thường với Firebase SDK — không ảnh hưởng chức năng |

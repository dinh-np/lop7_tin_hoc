---
name: deploy-vercel
description: >-
  Hướng dẫn deploy dự án lên Vercel và kiểm tra cấu hình.
  Dùng khi cần deploy mới, redeploy, hoặc thêm environment variables trên Vercel.
---

# Skill: Deploy lên Vercel

## ⚡ TL;DR — Cách deploy nhanh nhất

```powershell
git add -A
git commit -m "mô tả thay đổi"
git push
# Vercel tự động build & deploy từ GitHub — KHÔNG cần làm thêm gì
```

> ⚠️ **Vercel CLI trên máy này có lỗi** (EPERM khi upgrade, ECONNRESET khi cài).
> Không cần dùng Vercel CLI — chỉ cần `git push` là đủ.

## Cấu hình vercel.json

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }],
  "cleanUrls": true,
  "trailingSlash": false
}
```

## Vercel Project Info

- **Project**: `lop7-tin-hoc` (dinhnps-projects)
- **GitHub repo**: `dinh-np/lop7_tin_hoc` (branch: `main`)
- **Auto-deploy**: ✅ Mỗi push lên `main` → tự build & deploy

## Environment Variables trên Vercel

✅ **Đã cấu hình đủ** (2026-10-02). Vercel Dashboard → Project → Settings → Environment Variables:

| Key | Environments |
|-----|-------------|
| `VITE_GEMINI_API_KEY` | Production, Preview, Development |
| `VITE_FIREBASE_API_KEY` | Production, Preview, Development |
| `VITE_FIREBASE_AUTH_DOMAIN` | Production, Preview, Development |
| `VITE_FIREBASE_PROJECT_ID` | Production, Preview, Development |
| `VITE_FIREBASE_STORAGE_BUCKET` | Production, Preview, Development |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Production, Preview, Development |
| `VITE_FIREBASE_APP_ID` | Production, Preview, Development |

> Sau khi thêm/sửa biến env trên Vercel → phải **Redeploy** (Deployments → 3 chấm → Redeploy) để áp dụng.

## Kiểm tra sau deploy

1. Mở URL Vercel → app load được không
2. Chọn môn Tin học → **Thi Thử** → trả lời vài câu → Nộp bài
3. Kết quả màn hình hiển thị → có dòng `☁️ Kết quả đã được lưu lên Firebase`
4. Vào [Firebase Console](https://console.firebase.google.com/project/sotayontap-4c27e/firestore/data/submissions) → collection `submissions` có record mới
5. **Test offline**: DevTools → Network → Offline → reload app → vẫn load được từ cache

## Troubleshooting

| Lỗi | Giải pháp |
|-----|-----------|
| 404 Not Found | Kiểm tra `vercel.json` có `rewrites` và `outputDirectory: "dist"` |
| Build failed | Chạy `npm run build` local trước → sửa lỗi → push lại |
| Firebase không lưu data | Kiểm tra 6 biến `VITE_FIREBASE_*` trong Vercel env vars → Redeploy |
| Gemini không hoạt động | Kiểm tra `VITE_GEMINI_API_KEY` trong Vercel env vars |
| App không load offline | SW chưa install đủ — dùng thêm 1-2 lần online trước khi test offline |
| Vercel CLI lỗi EPERM/ECONNRESET | Bỏ qua CLI, dùng `git push` thay thế — auto-deploy vẫn chạy bình thường |
| Chunk size warning khi build | Bình thường (do Firebase SDK ~200KB gzip) — không ảnh hưởng chức năng |

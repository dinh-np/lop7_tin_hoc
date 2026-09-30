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
# Commit code
git add -A
git commit -m "mô tả thay đổi"
git push

# Vercel tự động deploy khi push lên GitHub
# Hoặc deploy thủ công:
vercel --prod
```

## Environment Variables trên Vercel

⚠️ `.env.local` KHÔNG được push lên GitHub. Phải thêm tay trên Vercel.

**Vercel Dashboard → Project → Settings → Environment Variables:**

| Key | Value | Environments |
|-----|-------|-------------|
| `VITE_GEMINI_API_KEY` | `AQ.xxx...` | Production, Preview |
| `VITE_SUPABASE_URL` | URL Supabase Cloud | Production, Preview |
| `VITE_SUPABASE_ANON_KEY` | `sb_publishable_xxx` hoặc Supabase Cloud key | Production, Preview |

> **Quan trọng**: Với Vercel, dùng Supabase **Cloud** (không phải Local 127.0.0.1).
> Xem hướng dẫn tạo Supabase Cloud: supabase/SETUP.md

## Kiểm tra sau deploy

1. Truy cập URL Vercel → app load được không
2. Chọn môn Tin học → Thi thử → Nộp bài
3. Kiểm tra AI phân tích xuất hiện (xác nhận Gemini API key hoạt động)
4. Kiểm tra Supabase Dashboard → bảng sessions có record mới

## Vercel Project Info

- **Project**: `lop7-tin-hoc` (dinhNPS projects)
- **Project ID**: `prj_DWGfGysERysaMwWp4Lu7dBgkiAzB`
- **Owner**: `dinhnps-projects` (team_x1IVkT1edu34rU2MGs9hryCZ)

## Troubleshooting

| Lỗi | Giải pháp |
|-----|-----------|
| 404 Not Found | Kiểm tra vercel.json có `rewrites` và `outputDirectory: "dist"` |
| Build failed | Chạy `npm run build` local, sửa lỗi trước khi deploy |
| Gemini không hoạt động | Kiểm tra VITE_GEMINI_API_KEY trong Vercel env vars |
| Supabase không kết nối | Dùng Supabase Cloud URL, không dùng 127.0.0.1 |

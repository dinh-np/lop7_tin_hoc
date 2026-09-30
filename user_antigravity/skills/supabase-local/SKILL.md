---
name: supabase-local
description: >-
  Hướng dẫn khởi động, quản lý và truy vấn Supabase Local cho dự án này.
  Dùng khi cần start/stop Supabase, xem dữ liệu, hoặc debug kết nối.
---

# Skill: Supabase Local – Quản lý & Truy vấn

## Thông tin kết nối

| Thông số | Giá trị |
|----------|---------|
| API URL | `http://127.0.0.1:54321` |
| Studio | `http://127.0.0.1:54323` |
| DB (psql) | `postgresql://postgres:postgres@127.0.0.1:54322/postgres` |
| Publishable key | `sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH` |

## Lệnh thường dùng

```powershell
# Khởi động (cần Docker Desktop)
npx supabase start

# Dừng (giữ data)
npx supabase stop

# Dừng và xóa data
npx supabase stop --no-backup

# Xem trạng thái
npx supabase status

# Reset DB và chạy lại migration
npx supabase db reset

# Tạo migration mới
npx supabase migration new ten_migration
```

## Cấu trúc DB

### Bảng `sessions` (public schema)
```sql
id              BIGSERIAL PRIMARY KEY
subject         TEXT NOT NULL          -- 'tin_hoc', 'pet_b1', etc.
mode            TEXT NOT NULL          -- 'practice' | 'exam'
score           NUMERIC(4,2)           -- 0.00 – 10.00
total_questions INT
correct_count   INT
wrong_ids       JSONB DEFAULT '[]'     -- array of question ids
duration_seconds INT
created_at      TIMESTAMPTZ DEFAULT NOW()
```

### View `subject_stats`
```sql
SELECT * FROM subject_stats;
-- Trả về: subject, total_sessions, avg_score, best_score, last_session
```

## Xem kết quả thi của con

**Cách 1 – Supabase Studio (đẹp nhất):**
1. Mở http://127.0.0.1:54323
2. Table Editor → sessions

**Cách 2 – CLI query:**
```bash
# Xem 10 session gần nhất
echo "SELECT subject, mode, score, correct_count, total_questions, created_at FROM sessions ORDER BY created_at DESC LIMIT 10;" | npx supabase db query

# Thống kê theo môn
echo "SELECT * FROM subject_stats;" | npx supabase db query
```

## Kết nối từ app (src/lib/supabase.js)

```js
// Kiểm tra kết nối (dùng trong browser console)
import { checkSupabaseStatus } from './src/lib/supabase.js';
const status = await checkSupabaseStatus();
console.log(status); // { connected: true } hoặc { connected: false, reason: '...' }
```

## Thêm migration mới

1. Tạo file: `supabase/migrations/YYYYMMDDHHMMSS_ten.sql`
2. Viết SQL
3. Chạy: `npx supabase db reset`

## Troubleshooting

| Lỗi | Giải pháp |
|-----|-----------|
| Docker not running | Mở Docker Desktop, chờ khởi động |
| Port 54321 in use | `npx supabase stop` rồi `npx supabase start` |
| Cannot connect | Kiểm tra `.env.local` – URL phải là `http://127.0.0.1:54321` (không phải postgresql://) |
| Key invalid | Dùng `sb_publishable_...` (không phải JWT `eyJ...`) |

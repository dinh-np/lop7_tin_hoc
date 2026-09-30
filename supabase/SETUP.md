# Hướng dẫn cài đặt Supabase để giám sát kết quả học từ xa

## Lựa chọn 1: Supabase Cloud (Khuyến nghị – miễn phí)

### Bước 1: Tạo project
1. Truy cập https://supabase.com/dashboard
2. Đăng ký / đăng nhập tài khoản
3. Nhấn **"New project"** → đặt tên → chọn region (Singapore gần nhất)
4. Đợi project khởi tạo (~2 phút)

### Bước 2: Chạy schema
1. Vào **SQL Editor** trong Supabase Dashboard
2. Nhấn **"New query"**
3. Dán toàn bộ nội dung file `supabase/schema.sql` vào
4. Nhấn **Run**

### Bước 3: Lấy API keys
1. Vào **Settings → API**
2. Copy **Project URL** → dán vào `.env.local` thay `YOUR_SUPABASE_URL`
3. Copy **anon public key** → dán vào `.env.local` thay `YOUR_SUPABASE_ANON_KEY`

### Bước 4: Xem kết quả của con
- Vào **Table Editor → sessions** để xem các lần thi
- Vào **SQL Editor** và chạy: `SELECT * FROM subject_stats;`
- Hoặc xem trực quan bằng chart trong Supabase Dashboard

---

## Lựa chọn 2: Supabase Local (offline)

```powershell
# Trong thư mục dự án
npx supabase init
npx supabase start

# Sau khi start, copy API URL và anon key từ output vào .env.local
# Chạy schema
npx supabase db execute --file supabase/schema.sql
```

> Lưu ý: Supabase Local cần Docker Desktop đang chạy.

---

## Lưu ý bảo mật
- File `.env.local` đã có trong `.gitignore` → **không bao giờ bị push lên GitHub**
- `anon key` là key public, an toàn để dùng trên frontend
- Nếu muốn chỉ bố/mẹ xem được dữ liệu, có thể thêm authentication (nâng cao)

---

## Xem kết quả của con theo thời gian thực
Trong Supabase Dashboard, bật **Realtime** cho bảng `sessions`:
1. **Database → Replication**
2. Enable realtime cho table `sessions`
3. Bố/mẹ có thể mở Supabase Dashboard và thấy kết quả ngay khi con nộp bài!

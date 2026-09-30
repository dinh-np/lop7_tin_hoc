# 📚 Cổng Ôn Tập Lớp 7

PWA ôn thi đa môn cho học sinh lớp 7, với Gemini AI phân tích câu sai và Supabase giám sát từ xa.

## Tính năng

| Tính năng | Mô tả |
|-----------|-------|
| 📚 Đa môn | 10 môn học + PET B1 English |
| ✏️ Luyện tập | Luyện theo chủ đề, từng câu một |
| 📝 Thi thử | Thi ngẫu nhiên có đếm giờ |
| 📖 Sổ tay sai | Theo dõi và ôn lại câu làm sai |
| 🤖 Gemini AI | Phân tích nguyên nhân câu sai sau thi |
| 📊 Supabase | Bố/mẹ giám sát kết quả từ xa |
| 📲 PWA | Cài đặt như app trên điện thoại |

## Môn học

- 💻 Tin học (70 câu)
- 🎓 PET B1 English (20 câu mẫu)
- 📐 Toán, 🔬 KHTN, 📖 Ngữ văn, 🇬🇧 Tiếng Anh, 🗺️ Lịch sử & Địa lí, 🏛️ GDCD, ⚙️ Công nghệ, 🏠 GD địa phương *(sắp có)*

## Cài đặt & Chạy

```bash
npm install
npm run dev
```

## Cấu hình API Keys

Sao chép `.env.local` và điền:

```env
VITE_GEMINI_API_KEY=your_key_here   # https://aistudio.google.com/app/apikey
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key
```

## Supabase Setup (giám sát từ xa)

Xem [`supabase/SETUP.md`](./supabase/SETUP.md) để biết hướng dẫn chi tiết.

## Deploy Vercel

```bash
# Vercel CLI
vercel --prod

# Hoặc connect GitHub repo tại vercel.com
# Framework: Vite | Output: dist | Build: npm run build
```

## Cấu trúc dự án

```
src/
├── components/
│   ├── SubjectPicker.jsx   # Màn hình chọn môn
│   ├── Quiz.jsx            # Luyện tập
│   ├── Exam.jsx            # Thi thử + AI analysis
│   └── Review.jsx          # Sổ tay câu sai
├── data/
│   ├── subjects.js         # Cấu hình môn học
│   ├── questionBank.js     # Index tổng hợp
│   ├── tinHocQuestions.js  # Câu hỏi Tin học
│   └── petB1Questions.js   # Câu hỏi PET B1
├── lib/
│   ├── gemini.js           # Gemini AI integration
│   └── supabase.js         # Supabase client
└── styles/
    └── theme.css           # Design system
supabase/
├── schema.sql              # Tạo bảng Supabase
└── SETUP.md                # Hướng dẫn cài đặt
```

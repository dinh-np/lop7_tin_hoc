-- ═══════════════════════════════════════════════════════════════
-- SUPABASE SCHEMA cho app Ôn Tập Lớp 7
-- Chạy file này trong Supabase Studio > SQL Editor
-- hoặc: psql -f supabase/schema.sql
-- ═══════════════════════════════════════════════════════════════

-- Bảng sessions: lưu mỗi lần thi/luyện tập
CREATE TABLE IF NOT EXISTS sessions (
  id          BIGSERIAL PRIMARY KEY,
  subject     TEXT NOT NULL,           -- 'tin_hoc', 'pet_b1', etc.
  mode        TEXT NOT NULL,           -- 'practice' | 'exam'
  score       NUMERIC(4,2),            -- điểm 0-10
  total_questions INT,
  correct_count   INT,
  wrong_ids   JSONB DEFAULT '[]',      -- mảng id câu sai
  duration_seconds INT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Index để query nhanh theo thời gian
CREATE INDEX IF NOT EXISTS idx_sessions_created_at ON sessions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_sessions_subject ON sessions(subject);

-- ─── Row Level Security ─────────────────────────────────────────
-- Bật RLS để an toàn (tùy chọn nếu dùng anon key public)
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

-- Policy: cho phép đọc tất cả (bố/mẹ có thể xem qua Supabase Studio)
CREATE POLICY "Allow read all" ON sessions FOR SELECT USING (true);

-- Policy: cho phép insert từ client (app của con)
CREATE POLICY "Allow insert" ON sessions FOR INSERT WITH CHECK (true);

-- ─── View: Thống kê theo môn ────────────────────────────────────
CREATE OR REPLACE VIEW subject_stats AS
SELECT
  subject,
  COUNT(*) AS total_sessions,
  ROUND(AVG(score)::NUMERIC, 2) AS avg_score,
  MAX(score) AS best_score,
  MIN(score) AS worst_score,
  SUM(correct_count) AS total_correct,
  SUM(total_questions) AS total_questions_answered,
  MAX(created_at) AS last_session
FROM sessions
GROUP BY subject
ORDER BY last_session DESC;

-- ─── View: Câu sai thường gặp ────────────────────────────────────
-- (cần PostgreSQL function để unnest JSONB array)
-- Dùng Supabase Studio để query thủ công khi cần.

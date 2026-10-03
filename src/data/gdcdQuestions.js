// Câu hỏi môn Giáo dục công dân 7 — Ôn tập Học kỳ 1
// Nguồn: src/data/subjects/gdcd7.json
// Tổng: 46 câu (40 trắc nghiệm + 6 tự luận)

import gdcd7Data from './subjects/gdcd7.json';

// Xuất tất cả câu hỏi (chuẩn hóa subject thành 'gdcd')
export const gdcdQuestions = gdcd7Data.questions.map((q) => ({
  ...q,
  subject: 'gdcd',
}));

// Metadata đề thi (dùng cho Exam mode)
export const gdcdTestMeta = {
  test_id: gdcd7Data.test_id,
  title: gdcd7Data.title,
  term: gdcd7Data.term,
  time_limit_minutes: gdcd7Data.time_limit_minutes,
};

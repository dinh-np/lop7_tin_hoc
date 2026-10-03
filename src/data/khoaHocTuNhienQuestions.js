// Câu hỏi môn Khoa học tự nhiên 7 — Ôn tập Giữa kì 1
// Nguồn: src/data/subjects/khtn7.json

import khtn7Data from './subjects/khtn7.json';

// Xuất tất cả câu hỏi (chuẩn hóa subject thành 'khoa_hoc_tu_nhien')
export const khoaHocTuNhienQuestions = khtn7Data.questions.map((q) => ({
  ...q,
  subject: 'khoa_hoc_tu_nhien',
}));

// Metadata đề thi (dùng cho Exam mode)
export const khoaHocTuNhienTestMeta = {
  test_id: khtn7Data.test_id,
  title: khtn7Data.title,
  term: khtn7Data.term,
  time_limit_minutes: khtn7Data.time_limit_minutes,
};

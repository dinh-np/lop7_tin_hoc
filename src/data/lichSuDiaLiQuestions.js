// Câu hỏi môn Lịch sử & Địa lí 7 — Ôn tập Giữa kỳ 1
// Nguồn: src/data/subjects/ls_dl7.json
// Tổng: 50 câu (25 Lịch sử + 25 Địa lí trắc nghiệm + 5 tự luận)

import lsDl7Data from './subjects/ls_dl7.json';

// Xuất tất cả câu hỏi (chuẩn hóa subject thành 'lich_su_dia_li')
export const lichSuDiaLiQuestions = lsDl7Data.questions.map((q) => ({
  ...q,
  subject: 'lich_su_dia_li',
}));

// Metadata đề thi (dùng cho Exam mode)
export const lichSuDiaLiTestMeta = {
  test_id: lsDl7Data.test_id,
  title: lsDl7Data.title,
  term: lsDl7Data.term,
  time_limit_minutes: lsDl7Data.time_limit_minutes,
};

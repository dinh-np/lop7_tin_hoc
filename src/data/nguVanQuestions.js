// Câu hỏi môn Ngữ văn 7 — Ôn tập Giữa kì I (6 đề đọc hiểu + viết)
// Nguồn: src/data/subjects/nguvan7.json
// Mỗi câu hỏi mang theo `passage` (văn bản đọc hiểu của đề) để hiển thị Split View.

import nguvan7Data from './subjects/nguvan7.json';

export const nguVanQuestions = nguvan7Data.flatMap((exam) =>
  exam.questions.map((q) => ({
    ...q,
    subject: 'ngu_van',
    topic: exam.title,
    examId: exam.id,
    passage: exam.reading_passage,
  }))
);

// Metadata các đề
export const nguVanTestMeta = nguvan7Data.map((exam) => ({
  id: exam.id,
  title: exam.title,
  term: exam.term,
  time_limit_minutes: exam.time_limit_minutes,
}));

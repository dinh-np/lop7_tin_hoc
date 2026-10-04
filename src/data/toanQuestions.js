import { toan7_tests } from './subjects/toan7';

export const toanTestMeta = toan7_tests.map((test) => ({
  id: test.test_id,
  title: test.title,
  time_limit_minutes: test.time_limit_minutes,
}));

export const toanQuestions = toan7_tests.flatMap((test) =>
  test.questions.map((q) => ({
    ...q,
    subject: 'toan',
    examId: test.test_id,
    part: q.type === 'short_essay' || q.type === 'calculation' ? 'Tự luận' : 'Trắc nghiệm',
  }))
);

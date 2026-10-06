import congNgheData from './subjects/congnghe7.json';

export const congNgheTestMeta = {
  test_id: congNgheData.test_id,
  title: congNgheData.title,
  term: congNgheData.term,
  time_limit_minutes: congNgheData.time_limit_minutes,
};

const mcq = (congNgheData.multiple_choice || []).map(q => ({ ...q, type: 'multiple_choice', subject: 'cong_nghe' }));
const tf = (congNgheData.true_false || []).map(q => ({ ...q, type: 'true_false', subject: 'cong_nghe' }));
const essay = (congNgheData.short_essay || []).map(q => ({ ...q, type: 'short_essay', subject: 'cong_nghe' }));

export const congNgheQuestions = [...mcq, ...tf, ...essay];

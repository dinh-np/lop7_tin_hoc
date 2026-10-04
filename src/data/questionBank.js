// Master Question Bank - aggregates all subjects
import { tinHocQuestions } from './tinHocQuestions';
import { petB1Questions } from './petB1Questions';
import { lichSuDiaLiQuestions } from './lichSuDiaLiQuestions';
import { gdcdQuestions } from './gdcdQuestions';
import { khoaHocTuNhienQuestions } from './khoaHocTuNhienQuestions';
import { nguVanQuestions } from './nguVanQuestions';
// When adding new subjects, import here:
import { toanQuestions } from './toanQuestions';

// Placeholder banks for new subjects (to be filled with real questions)
// khoaHocTuNhienQuestions — imported above from ./khoaHocTuNhienQuestions.js
export { nguVanQuestions }; // imported above from ./nguVanQuestions.js
export const tiengAnhQuestions = []; // School English (not PET)
// lichSuDiaLiQuestions — imported above from ./lichSuDiaLiQuestions.js
// gdcdQuestions — imported above from ./gdcdQuestions.js
export const congNgheQuestions = [];
export const gdDiaPhuongQuestions = [];

// Map subject id => question array
export const questionsBySubject = {
  tin_hoc: tinHocQuestions,
  toan: toanQuestions,
  khoa_hoc_tu_nhien: khoaHocTuNhienQuestions,
  ngu_van: nguVanQuestions,
  tieng_anh: tiengAnhQuestions,
  lich_su_dia_li: lichSuDiaLiQuestions,
  gdcd: gdcdQuestions,
  cong_nghe: congNgheQuestions,
  gd_dia_phuong: gdDiaPhuongQuestions,
  pet_b1: petB1Questions,
};

// Get questions for a specific subject
export const getQuestionsForSubject = (subjectId, part = 'all') => {
  const list = questionsBySubject[subjectId] || [];
  if (part === 'essay') return list.filter((q) => q.type === 'short_essay');
  if (part === 'mcq') return list.filter((q) => q.type !== 'short_essay');
  return list;
};

// Môn có cả trắc nghiệm lẫn tự luận → hiện 2 tab riêng
export const hasEssayQuestions = (subjectId) => {
  const list = questionsBySubject[subjectId] || [];
  return list.some((q) => q.type === 'short_essay') && list.some((q) => q.type !== 'short_essay');
};

// Legacy export – for backward compatibility (old components still use questionBank)
export const questionBank = tinHocQuestions;

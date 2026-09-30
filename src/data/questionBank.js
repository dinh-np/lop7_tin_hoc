// Master Question Bank - aggregates all subjects
import { tinHocQuestions } from './tinHocQuestions';
import { petB1Questions } from './petB1Questions';
// When adding new subjects, import here:
// import { toanQuestions } from './toanQuestions';
// import { khoaHocTuNhienQuestions } from './khoaHocTuNhienQuestions';

// Placeholder banks for new subjects (to be filled with real questions)
export const toanQuestions = [];
export const khoaHocTuNhienQuestions = [];
export const nguVanQuestions = [];
export const tiengAnhQuestions = []; // School English (not PET)
export const lichSuDiaLiQuestions = [];
export const gdcdQuestions = [];
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
export const getQuestionsForSubject = (subjectId) => {
  return questionsBySubject[subjectId] || [];
};

// Legacy export – for backward compatibility (old components still use questionBank)
export const questionBank = tinHocQuestions;

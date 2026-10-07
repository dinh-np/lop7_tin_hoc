// Master Question Bank - aggregates all subjects
import { fetchSubjectDataFromFirestore } from '../lib/firebase';
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
export const tiengAnhQuestions = Array.from({ length: 114 }, (_, i) => ({
  id: `ta7_ph_${i}`,
  subject: 'tieng_anh',
  type: 'multiple_choice',
  question: 'Đang tải dữ liệu từ Firestore, vui lòng đợi...',
  options: ['...', '...', '...', '...'],
  answer: 0,
}));
// lichSuDiaLiQuestions — imported above from ./lichSuDiaLiQuestions.js
// gdcdQuestions — imported above from ./gdcdQuestions.js
import { congNgheQuestions } from './congNgheQuestions';
export { congNgheQuestions };
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
  if (part === 'tf') return list.filter((q) => q.type === 'true_false');
  if (part === 'mcq') return list.filter((q) => q.type !== 'short_essay' && q.type !== 'true_false');
  return list;
};

// Đồng bộ dữ liệu mới nhất từ Firestore
export const syncSubjectData = async (subjectId) => {
  if (subjectId === 'tieng_anh') {
    const questionsFromDb = await fetchSubjectDataFromFirestore('tienganh7_gki');
    if (questionsFromDb && Array.isArray(questionsFromDb) && questionsFromDb.length > 0) {
      questionsBySubject[subjectId] = questionsFromDb.map((q) => ({
        ...q,
        subject: 'tieng_anh',
      }));
      return true;
    }
  }
  if (subjectId === 'lich_su_dia_li') {
    const questionsFromDb = await fetchSubjectDataFromFirestore('ls_dl_7_gki');
    if (questionsFromDb && Array.isArray(questionsFromDb) && questionsFromDb.length > 0) {
      // THAY THẾ HOÀN TOÀN MẢNG TRONG BỘ NHỚ
      questionsBySubject[subjectId] = questionsFromDb.map((q) => ({
        ...q,
        subject: subjectId,
      }));
      return true;
    }
  }
  if (subjectId === 'cong_nghe') {
    const questionsFromDb = await fetchSubjectDataFromFirestore('congnghe_7_hk1');
    if (questionsFromDb && questionsFromDb.multiple_choice) {
      const mcq = (questionsFromDb.multiple_choice || []).map(q => ({ ...q, type: 'multiple_choice', subject: 'cong_nghe' }));
      const tf = (questionsFromDb.true_false || []).map(q => ({ ...q, type: 'true_false', subject: 'cong_nghe' }));
      const essay = (questionsFromDb.short_essay || []).map(q => ({ ...q, type: 'short_essay', subject: 'cong_nghe' }));
      questionsBySubject[subjectId] = [...mcq, ...tf, ...essay];
      return true;
    }
  }
  // TODO: Hỗ trợ thêm các môn khác nếu cần
  return false;
};

// Môn có cả trắc nghiệm lẫn tự luận → hiện 2 tab riêng
export const hasEssayQuestions = (subjectId) => {
  const list = questionsBySubject[subjectId] || [];
  return list.some((q) => q.type === 'short_essay');
};

export const hasTrueFalseQuestions = (subjectId) => {
  const list = questionsBySubject[subjectId] || [];
  return list.some((q) => q.type === 'true_false');
};

// Legacy export – for backward compatibility (old components still use questionBank)
export const questionBank = tinHocQuestions;

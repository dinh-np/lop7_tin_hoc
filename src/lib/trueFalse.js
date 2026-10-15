/**
 * Helpers cho dạng câu hỏi Đúng / Sai (type: 'true_false').
 * Tách riêng để Exam/Quiz/Review dùng chung mà không đụng logic trắc nghiệm.
 */

const KEYS = ['a', 'b', 'c', 'd', 'e', 'f'];

/** Key của ý (a, b, c, d) — ưu tiên field `key`, fallback theo thứ tự */
export const getItemKey = (item, idx) => (item && item.key) || KEYS[idx] || String(idx);

/** Bỏ tiền tố "a) " nếu dữ liệu cũ đã ghi sẵn trong statement */
export const cleanStatement = (text = '') => text.replace(/^\s*[a-fA-F]\)\s*/, '');

/** Bỏ tiền tố "ĐÚNG:" / "SAI:" trong explanation (tiêu đề hộp giải thích đã nói rõ) */
export const cleanExplanation = (text = '') => text.replace(/^\s*(ĐÚNG|SAI)\s*:\s*/i, '');

/** Ngữ cảnh / văn bản dẫn đề (hỗ trợ cả field cũ `passage`) */
export const getContext = (question) => question?.context || question?.passage || '';

/**
 * Chấm 1 câu Đúng/Sai.
 * Thang điểm theo cấu trúc đề mới của Bộ GD&ĐT (quy về hệ số 1 câu):
 *   đúng 1 ý → 0.1 | 2 ý → 0.25 | 3 ý → 0.5 | 4 ý → 1
 * @returns {{ correctCount:number, total:number, allCorrect:boolean, points:number }}
 */
export function scoreTrueFalse(question, answers = {}) {
  const items = Array.isArray(question?.items) ? question.items : [];
  const total = items.length;
  const safeAnswers = answers || {};
  const correctCount = items.reduce(
    (sum, item, idx) => sum + (safeAnswers[getItemKey(item, idx)] === item.answer ? 1 : 0),
    0
  );
  const allCorrect = total > 0 && correctCount === total;

  let points;
  if (total === 4) {
    points = [0, 0.1, 0.25, 0.5, 1][correctCount];
  } else {
    points = total > 0 ? correctCount / total : 0;
  }
  return { correctCount, total, allCorrect, points };
}

/** Đáp án chuẩn dạng map { a: true, b: false, ... } (dùng khi lưu Firebase) */
export const getCorrectMap = (question) =>
  Object.fromEntries((question?.items || []).map((item, idx) => [getItemKey(item, idx), item.answer]));

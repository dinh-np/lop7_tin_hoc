// Gemini AI integration for question analysis
// Set VITE_GEMINI_API_KEY in .env.local

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_MODEL = 'gemini-2.0-flash';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

/**
 * Ask Gemini to diagnose why a student answered a question incorrectly.
 * @param {Object} question - The question object
 * @param {number} studentAnswer - Index of the student's chosen answer
 * @returns {Promise<string>} - AI analysis text
 */
export async function diagnoseWrongAnswer(question, studentAnswer) {
  if (!GEMINI_API_KEY) {
    return '⚠️ Chưa cấu hình Gemini API key. Thêm VITE_GEMINI_API_KEY vào file .env.local để bật tính năng này.';
  }

  const subjectMap = {
    tin_hoc: 'Tin học',
    toan: 'Toán',
    khoa_hoc_tu_nhien: 'Khoa học Tự nhiên',
    ngu_van: 'Ngữ văn',
    tieng_anh: 'Tiếng Anh',
    lich_su_dia_li: 'Lịch sử & Địa lí',
    gdcd: 'GDCD',
    cong_nghe: 'Công nghệ',
    gd_dia_phuong: 'GD địa phương',
    pet_b1: 'PET B1 English',
  };

  const subject = subjectMap[question.subject] || question.subject;
  const correctOption = question.options[question.answer];
  const wrongOption = question.options[studentAnswer];

  const prompt = `Bạn là gia sư môn ${subject} cho học sinh lớp 7.

Câu hỏi: ${question.question}

Các đáp án:
${question.options.map((opt, i) => `${i === question.answer ? '✓' : ' '} ${opt}`).join('\n')}

Học sinh đã chọn: ${wrongOption}
Đáp án đúng: ${correctOption}

Hãy phân tích ngắn gọn (3-5 câu) bằng tiếng Việt:
1. Tại sao học sinh có thể đã chọn sai đáp án này?
2. Khái niệm cốt lõi học sinh cần nhớ để không mắc lỗi này nữa.
3. Một mẹo nhỏ hoặc cách ghi nhớ dễ hơn.

Trả lời thân thiện, khích lệ, không dài quá 120 từ.`;

  try {
    const response = await fetch(`${API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 300,
        },
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      console.error('[Gemini] API error:', err);
      return `❌ Gemini AI lỗi: ${err.error?.message || 'Không thể kết nối'}`;
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return text || '⚠️ Không nhận được phản hồi từ AI.';
  } catch (err) {
    console.error('[Gemini] Network error:', err);
    return '❌ Không thể kết nối Gemini AI. Kiểm tra kết nối mạng.';
  }
}

/**
 * Batch analyze multiple wrong questions (returns array of analyses).
 * @param {Array} wrongQuestions - Array of {question, studentAnswer}
 * @returns {Promise<Object>} - Map of questionId => analysis
 */
export async function batchDiagnose(wrongQuestions) {
  const results = {};
  // Process sequentially to avoid rate limiting
  for (const { question, studentAnswer } of wrongQuestions) {
    results[question.id] = await diagnoseWrongAnswer(question, studentAnswer);
    // Small delay between requests
    await new Promise((r) => setTimeout(r, 300));
  }
  return results;
}

export const isGeminiConfigured = !!GEMINI_API_KEY;

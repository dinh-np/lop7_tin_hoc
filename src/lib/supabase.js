// Supabase client configuration
// To enable Supabase: fill in VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local
// Run: npx supabase init && npx supabase start  (see supabase/SETUP.md)

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isConfigured =
  SUPABASE_URL &&
  SUPABASE_ANON_KEY &&
  SUPABASE_URL !== 'YOUR_SUPABASE_URL' &&
  SUPABASE_ANON_KEY !== 'YOUR_SUPABASE_ANON_KEY';

// Singleton client
let _supabase = null;

function getSupabase() {
  if (!isConfigured) return null;
  if (_supabase) return _supabase;
  _supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  return _supabase;
}

// ─── SESSION TRACKING ─────────────────────────────────────────────────────────

/**
 * Save an exam/quiz session to Supabase.
 * @param {Object} sessionData
 * @param {string} sessionData.subject       - Subject id ('tin_hoc', 'pet_b1', etc.)
 * @param {string} sessionData.mode          - 'practice' | 'exam'
 * @param {number} sessionData.score         - Score 0–10
 * @param {number} sessionData.totalQuestions
 * @param {number} sessionData.correctCount
 * @param {Array}  sessionData.wrongIds      - Array of wrong question ids
 * @param {number} sessionData.durationSeconds
 */
export async function saveSession(sessionData) {
  const db = getSupabase();
  if (!db) {
    console.log('[Supabase] Not configured – session saved locally only');
    return null;
  }

  try {
    const { data, error } = await db.from('sessions').insert([
      {
        subject: sessionData.subject,
        mode: sessionData.mode,
        score: sessionData.score,
        total_questions: sessionData.totalQuestions,
        correct_count: sessionData.correctCount,
        wrong_ids: sessionData.wrongIds,
        duration_seconds: sessionData.durationSeconds,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error('[Supabase] Error saving session:', error.message);
      return null;
    }
    console.log('[Supabase] Session saved ✓');
    return data;
  } catch (err) {
    console.error('[Supabase] saveSession failed:', err);
    return null;
  }
}

/**
 * Fetch recent sessions (for parent dashboard).
 */
export async function fetchSessions(limit = 20) {
  const db = getSupabase();
  if (!db) return [];

  const { data, error } = await db
    .from('sessions')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('[Supabase] Error fetching sessions:', error);
    return [];
  }
  return data || [];
}

/**
 * Check if Supabase is configured and reachable.
 * @returns {Promise<{connected: boolean, reason?: string}>}
 */
export async function checkSupabaseStatus() {
  if (!isConfigured) return { connected: false, reason: 'not_configured' };
  const db = getSupabase();
  if (!db) return { connected: false, reason: 'client_init_failed' };
  try {
    const { error } = await db.from('sessions').select('id').limit(1);
    if (error) return { connected: false, reason: error.message };
    return { connected: true };
  } catch (err) {
    return { connected: false, reason: err.message };
  }
}

export { isConfigured as isSupabaseConfigured };

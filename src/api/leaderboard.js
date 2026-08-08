// api/leaderboard.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const page = parseInt(req.query.page || '1');
  const limit = parseInt(req.query.limit || '10');
  const offset = (page - 1) * limit;

  try {
    // Query profiles sorted by active streak, then completed days
    const { data: leaderboard, count, error } = await supabase
      .from('profiles')
      .select('id, full_name, college, track, github_username, streak_count', { count: 'exact' })
      .order('streak_count', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    return res.status(200).json({
      success: true,
      data: leaderboard,
      pagination: {
        total: count,
        page,
        totalPages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
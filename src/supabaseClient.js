import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ycubcwxsdsqjkqhkazrr.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_s8MgiTvp2iHqda26IqoCCQ_xcnHNYRY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true, // Keeps user logged in automatically
    autoRefreshToken: true, // Refreshes login token in background
    detectSessionInUrl: true,
  },
});
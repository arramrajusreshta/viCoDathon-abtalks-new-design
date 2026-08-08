import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ycubcwxsdsqjkqhkazrr.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_s8MgiTvp2iHqda26IqoCCQ_xcnHNYRY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
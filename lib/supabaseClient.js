import { createClient } from '@supabase/supabase-js';

const supabaseURL = 'https://vqrgxazjkpiuwxpmjheh.supabase.co';
const supabaseAnonKey = import.meta.env.NEXT_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseURL, supabaseAnonKey);

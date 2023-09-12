import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_ANON_KEY;

// export const getSupabaseBrowserClient = () => {
//   return createClient<Database>(supabaseUrl, supabaseKey);
// };

export const getSupabaseBrowserClient = createClient<Database>(supabaseUrl, supabaseKey);

// export default supabase;

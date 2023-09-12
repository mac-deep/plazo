import { useMemo } from 'react';
import { getSupabaseBrowserClient } from '../client/supabaseClient';

function useSupabase() {
  return useMemo(() => getSupabaseBrowserClient, []);
}

export default useSupabase;

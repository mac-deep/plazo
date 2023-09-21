import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../types/database.types';
import { PlazoPayloadType, PlazoType } from '../types/plazo.types';

export const getPlazosByUserId = (
  client: SupabaseClient<Database>,
  params: {
    uid: string;
    type: PlazoType['type'];
  }
) => {
  return client
    .from('Plazo')
    .select('*')
    .eq('userId', params.uid)
    .eq('type', params.type)
    .order('endDate', { ascending: true });
};

export const updatePlazoById = (
  client: SupabaseClient<Database>,
  params: {
    id: string;
    payload: PlazoPayloadType;
  }
) => {
  return client
    .from('Plazo')
    .update({ ...params.payload })
    .match({ id: params.id })
    .select('*')
    .single();
};

export const createPlazo = (
  client: SupabaseClient<Database>,
  params: {
    uid: string;
    payload: PlazoPayloadType;
    type: PlazoType['type'];
  }
) => {
  return client
    .from('Plazo')
    .insert({ userId: params.uid, type: params.type, ...params.payload })
    .select('*')
    .single();
};

export const deletePlazoById = (
  client: SupabaseClient<Database>,
  params: {
    id: string;
  }
) => {
  return client.from('Plazo').delete().eq('id', params.id);
};

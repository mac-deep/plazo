import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../types/database.types';
import { PlazoPayloadType } from '../types/plazo.types';

export const getPlazosByUserId = (client: SupabaseClient<Database>, uid: string) => {
  return client.from('Plazo').select('*').eq('userId', uid).order('endDate', { ascending: true });
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
  }
) => {
  return client
    .from('Plazo')
    .insert({ ...params.payload, userId: params.uid })
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

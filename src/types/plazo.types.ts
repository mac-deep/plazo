import { Database } from './database.types';
import { DurationUnit } from './moment.types';

export type PlazoType = Database['public']['Tables']['Plazo']['Row'];

export type PlazoPayloadType = Pick<PlazoType, 'title' | 'startDate'> & {
  endDate?: PlazoType['endDate'];
};

export type PlazoFiniteFormType = PlazoPayloadType & {
  durationValue: number;
  durationUnit: keyof typeof DurationUnit;
};

export type PlazoInfiniteFormType = Pick<PlazoType, 'title' | 'startDate'>;

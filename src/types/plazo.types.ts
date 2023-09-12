import { DurationUnit } from './moment.types';

export type PlazoType = {
  createdAt: string;
  endDate: string;
  id: string;
  startDate: string;
  title: string;
  userId: string;
};

export type PlazoPayloadType = Pick<PlazoType, 'startDate' | 'endDate' | 'title'>;

export type PlazoFormType = PlazoPayloadType & {
  durationValue: number;
  durationUnit: keyof typeof DurationUnit;
};

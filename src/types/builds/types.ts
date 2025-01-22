import { Build, BuildVolume } from '../builds/core';

export type BuildFormData = Omit<Build, 'id' | 'created_at'> & {
  buildVolume: BuildVolume;
  userId: string;
};

export interface BuildQueryParams {
  userId?: string;
  sort?: string;
  order?: 'asc' | 'desc';
}

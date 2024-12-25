import { Json } from '@/types';

export interface BuildFormData {
  id?: string;
  user_id: string;
  name: string;
  description?: string;
  build_volume: BuildVolume;
  parts: BuildPart[];
  images: BuildImage[];
}

export interface BuildQueryParams {
  userId?: string;
  sort?: string;
  order?: 'asc' | 'desc';
}
import { Json } from '../database/json';

export interface BuildVolume {
  x: number;
  y: number;
  z: number;
  units: string;
}

export interface BuildPart {
  id: string;
  name: string;
  quantity: number;
}

export interface BuildImage {
  url: string;
  caption?: string;
}

export interface Build {
  id: string;
  name: string;
  description?: string;
  build_volume: BuildVolume;
  parts: BuildPart[];
  images: BuildImage[];
  user_id: string;
  created_at: string;
}

export interface BuildQueryParams {
  sort?: string;
  order?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
  search?: string;
  category?: string;
}

export type BuildFormData = Omit<Build, 'id' | 'created_at' | 'user_id'>;
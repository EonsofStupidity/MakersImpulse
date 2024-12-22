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

export interface BuildFormData {
  name: string;
  description?: string;
  build_volume: BuildVolume;
  parts: BuildPart[];
  images: File[];
}

export interface BuildQueryParams {
  userId?: string;
  category?: string;
  search?: string;
  sort?: 'newest' | 'popular';
  page?: number;
  limit?: number;
}
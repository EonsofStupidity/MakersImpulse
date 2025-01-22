import { Json } from '@/types/core/json';

export interface BuildVolume {
  x: number;
  y: number;
  z: number;
  units: 'mm' | 'cm' | 'inches';
}

export interface BuildPart {
  id: string;
  name: string;
  quantity: number;
  notes?: string;
  attributes?: Record<string, Json>;
}

export interface BuildImage {
  url: string;
  alt?: string;
  caption?: string;
}

export interface Build {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  build_volume: BuildVolume;
  parts: BuildPart[];
  images: BuildImage[];
  created_at: string;
}

// Query parameters for build listing
export interface BuildQueryParams {
  userId?: string;
  name?: string;
  sort?: string;
  order?: 'asc' | 'desc';
}

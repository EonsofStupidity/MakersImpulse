import { Json } from '@/types/core/json';

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
  type: string;
}

export interface Build {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  build_volume?: BuildVolume;
  parts?: BuildPart[];
  images?: BuildImage[];
  created_at?: string;
}

export interface BuildFormData extends Omit<Build, 'id' | 'user_id' | 'created_at'> {
  buildVolume: BuildVolume;
  parts: BuildPart[];
  images: BuildImage[];
}

export interface BuildQueryParams {
  userId?: string;
  category?: string;
  limit?: number;
  offset?: number;
}
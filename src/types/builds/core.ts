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
  userId: string;
  name: string;
  description?: string;
  buildVolume: BuildVolume;
  parts: BuildPart[];
  images: BuildImage[];
  createdAt: string;
}

// Query parameters for build listing
export interface BuildQueryParams {
  userId?: string;
  name?: string;
  sort?: string;
  order?: 'asc' | 'desc';
}
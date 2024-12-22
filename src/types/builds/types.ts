import { Json } from '../core/json';

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
  notes?: string;
  attributes?: Record<string, unknown>;
}

export interface BuildImage {
  url: string;
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

export interface BuildQueryParams {
  userId?: string;
  name?: string;
  sortField?: string;
  sortDirection?: 'asc' | 'desc';
}

export type BuildFormData = Omit<Build, 'id' | 'userId' | 'createdAt'>;
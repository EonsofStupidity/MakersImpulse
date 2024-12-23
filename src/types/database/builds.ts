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
  caption?: string;
}

export interface BuildRow {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  build_volume: Json;
  parts: Json;
  images: Json;
  created_at?: string;
}

export interface Build {
  id: string;
  userId: string;
  name: string;
  description: string;
  buildVolume: BuildVolume;
  parts: BuildPart[];
  images: BuildImage[];
  createdAt: string;
}

export const transformBuildFromDb = (row: BuildRow): Build => {
  const buildVolume = row.build_volume as unknown as BuildVolume;
  const parts = row.parts as unknown as BuildPart[];
  const images = row.images as unknown as BuildImage[];

  return {
    id: row.id,
    userId: row.user_id,
    name: row.name,
    description: row.description || '',
    buildVolume,
    parts,
    images,
    createdAt: row.created_at || new Date().toISOString()
  };
};
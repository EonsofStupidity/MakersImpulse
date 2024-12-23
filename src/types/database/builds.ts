import type { Json } from '../core/json';
import type { BuildVolume, BuildPart, BuildImage } from '../builds/core';

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

export function transformBuildFromDb(row: BuildRow) {
  return {
    id: row.id,
    userId: row.user_id,
    name: row.name,
    description: row.description,
    buildVolume: row.build_volume as BuildVolume,
    parts: row.parts as BuildPart[],
    images: row.images as BuildImage[],
    createdAt: row.created_at
  };
}
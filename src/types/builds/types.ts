import { Json } from "@/types";

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
  type: string;
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

export type BuildFormData = Omit<Build, 'id' | 'created_at'> & {
  buildVolume: BuildVolume;
  userId: string;
};

export interface BuildQueryParams {
  userId?: string;
  sort?: string;
  order?: 'asc' | 'desc';
}
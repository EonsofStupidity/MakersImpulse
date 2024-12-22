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
  user_id: string;
  name: string;
  description?: string;
  build_volume?: BuildVolume;
  parts: BuildPart[];
  images: BuildImage[];
  created_at?: string;
}

export interface BuildFormData {
  name: string;
  description?: string;
  build_volume?: BuildVolume;
  parts: BuildPart[];
  images: BuildImage[];
}

export interface BuildQueryParams {
  userId?: string;
  category?: string;
  status?: string;
  sortBy?: string;
  order?: 'asc' | 'desc';
}
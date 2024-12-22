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
  created_at: string;
}

export interface BuildQueryParams {
  userId?: string;
  sort?: {
    field: string;
    direction: 'asc' | 'desc';
  };
}

export type BuildFormData = Omit<Build, 'id' | 'user_id' | 'created_at'>;
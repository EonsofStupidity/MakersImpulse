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
  attributes?: Record<string, any>;
}

export interface BuildImage {
  url: string;
  caption?: string;
}

export interface Build {
  id: string;
  name: string;
  description?: string;
  userId: string;
  buildVolume: BuildVolume;
  parts: BuildPart[];
  images: BuildImage[];
  createdAt: string;
}

export interface BuildQueryParams {
  userId?: string;
  sort?: {
    field: string;
    direction: 'asc' | 'desc';
  };
}

export interface BuildFormData {
  name?: string;
  description?: string;
  buildVolume?: BuildVolume;
  parts?: BuildPart[];
  images?: BuildImage[];
}
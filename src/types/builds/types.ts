export interface BuildImage {
  url: string;
  alt: string;
  caption: string;
  type: string;
}

export interface BuildPart {
  id: string;
  name: string;
  quantity: number;
  notes?: string;
  attributes?: Record<string, any>;
}

export interface Build {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  build_volume: {
    x: number;
    y: number;
    z: number;
    units: string;
  };
  parts: BuildPart[];
  images: BuildImage[];
  created_at: string;
}
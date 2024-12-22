export interface BuildVolume {
  x: number;
  y: number;
  z: number;
  units: string;
}

export interface BuildImage {
  url: string;
  caption?: string;
}

export interface BuildPart {
  id: string;
  name: string;
  quantity: number;
}

export interface Build {
  id: string;
  name: string;
  description?: string;
  build_volume: BuildVolume;
  parts: BuildPart[];
  images: BuildImage[];
  user_id: string;
  created_at: string;
}
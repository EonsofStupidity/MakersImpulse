export interface BuildVolume {
  x: number;
  y: number;
  z: number;
  units: string;
}

export interface Build {
  id: string;
  userId: string;
  name: string;
  description: string;
  buildVolume: BuildVolume;
  parts: any[];
  images: string[];
  createdAt: string;
}
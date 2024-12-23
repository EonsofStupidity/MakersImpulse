import { Json } from './json';

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

export const convertJsonToBuildVolume = (json: Json): BuildVolume => {
  if (typeof json !== 'object' || !json) {
    throw new Error('Invalid BuildVolume data');
  }
  return json as BuildVolume;
};

export const convertJsonToBuildParts = (json: Json): BuildPart[] => {
  if (!Array.isArray(json)) {
    throw new Error('Invalid BuildParts data');
  }
  return json as BuildPart[];
};

export const convertJsonToBuildImages = (json: Json): BuildImage[] => {
  if (!Array.isArray(json)) {
    throw new Error('Invalid BuildImages data');
  }
  return json as BuildImage[];
};
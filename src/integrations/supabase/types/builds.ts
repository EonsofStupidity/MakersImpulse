import { Json } from './base';
import { TableDefinition } from './base';

export interface BuildVolume {
  x: number;
  y: number;
  z: number;
  units: string;
}

export interface Build {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  build_volume?: Json;
  parts?: Json;
  images?: Json;
  created_at?: string;
}

export type BuildsTable = TableDefinition<Build>;
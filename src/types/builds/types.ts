import type { Database } from '@/integrations/supabase/types/database';

type BuildRow = Database['public']['Tables']['mi3dp_builds']['Row'];

export interface BuildVolume {
  x: number;
  y: number;
  z: number;
  units: 'mm' | 'cm' | 'inches';
}

export interface BuildPart {
  id: string;
  name: string;
  quantity: number;
  notes?: string;
  attributes?: Record<string, string | number | boolean>;
}

export interface BuildImage {
  url: string;
  alt?: string;
  caption?: string;
}

export interface Build {
  id: string;
  user_id: string;
  name: string;
  description?: string | null;
  build_volume?: BuildVolume | null;
  parts?: BuildPart[] | null;
  images?: BuildImage[] | null;
  created_at?: string;
}

export type BuildFormData = Omit<Build, 'id' | 'user_id' | 'created_at'>;

export interface BuildQueryParams {
  userId?: string;
  sortBy?: 'created_at' | 'name';
  sortOrder?: 'asc' | 'desc';
}
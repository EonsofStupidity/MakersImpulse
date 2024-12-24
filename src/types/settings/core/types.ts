import { Json } from '@/types/core/json';

export interface ApplicationSettings {
  id?: string;
  site_title: string;
  tagline?: string;
  logo_url?: string;
  favicon_url?: string;
  metadata?: Record<string, Json>;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  updated_by?: string;
}
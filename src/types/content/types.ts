import { Json } from '../database/json';

export interface ContentRevision {
  id: string;
  content_id: string;
  content: Json;
  version_number: number;
  created_by: string;
  created_at: string;
  change_summary?: string;
}

export interface ContentWithAuthor {
  id: string;
  title: string;
  content: Json;
  created_by: {
    display_name: string;
  };
  metadata?: Json;
  slug?: string;
  status: 'draft' | 'published' | 'archived';
  version: number;
  created_at: string;
  updated_at?: string;
}
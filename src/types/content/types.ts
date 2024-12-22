import { Json } from '@/types/database/json';

export interface ContentRevision {
  id: string;
  content_id: string;
  content: Json;
  version: number;
  created_at: string;
  created_by: string;
  metadata?: Json;
}

export interface ContentWithAuthor {
  id: string;
  title: string;
  content: Json;
  created_by: {
    display_name: string;
  };
  created_at: string;
  updated_at: string;
  status: 'draft' | 'published' | 'archived';
  metadata?: Json;
}
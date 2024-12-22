import { Json } from '../database/json';

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
  updated_at: string;
  created_at: string;
}
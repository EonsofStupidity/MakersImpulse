import { Json } from '@/types/core/json';

export type ContentType = 'template' | 'component' | 'page' | 'workflow';
export type ContentStatus = 'draft' | 'published' | 'archived';

export interface ContentAuthor {
  id: string;
  display_name: string;
}

export interface ContentWithAuthor {
  id: string;
  title: string;
  type: ContentType;
  content: Json;
  metadata: Json;
  slug?: string;
  status: ContentStatus;
  version: number;
  created_by: ContentAuthor;
  updated_by?: ContentAuthor;
  created_at: string;
  updated_at?: string;
}
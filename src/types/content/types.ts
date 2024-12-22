import { Json } from '@/types/database/json';

export interface ContentRevision {
  id: string;
  content_id: string;
  content: Json;
  version: number;
  created_at: string;
  created_by: string;
}

export interface ContentWithAuthor {
  id: string;
  title: string;
  content: Json;
  created_at: string;
  created_by: {
    display_name: string;
  };
  metadata: Json;
  slug: string;
  status: 'draft' | 'published' | 'archived';
  type: 'template' | 'page' | 'component' | 'workflow';
  updated_at: string;
  updated_by: {
    display_name: string;
  }[];
  version: number;
}
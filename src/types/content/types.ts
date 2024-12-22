import { Json } from '@/types/core/json';

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
  created_by: {
    display_name: string;
  };
  created_at: string;
  status: 'draft' | 'published' | 'archived';
}

export interface ContentType {
  id: string;
  name: string;
  fields: Record<string, any>;
  validations?: Record<string, any>;
}
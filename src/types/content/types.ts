import { Json } from '@/types/database';

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
  type: 'template' | 'page' | 'component' | 'workflow';
  version: number;
  updated_at: string;
  updated_by?: {
    display_name: string;
  };
}
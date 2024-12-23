import { Json } from '@/types/core/json';

export interface ContentRevision {
  id: string;
  content_id: string;
  content: Json;
  metadata: Json;
  created_by: string;
  created_at: string;
  version_number: number;
  change_summary?: string;
  rollback_metadata?: Json;
  publish_status?: string;
  scheduled_publish_at?: string;
  rollback_from?: string;
  profiles?: {
    username: string;
    display_name: string;
  };
}

export interface ContentWithAuthor {
  id: string;
  title: string;
  content: Json;
  type: 'template' | 'page' | 'component' | 'workflow';
  metadata: Json;
  slug: string;
  status: 'draft' | 'published' | 'archived';
  version: number;
  created_by: {
    display_name: string;
  };
  updated_by: {
    display_name: string;
  };
  created_at: string;
  updated_at: string;
}
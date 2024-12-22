import { Json } from '../core/json';

export interface ContentRevision {
  id: string;
  content_id: string;
  content: Json;
  metadata?: Json;
  created_by: string;
  created_at: string;
  version_number: number;
  change_summary?: string;
  rollback_metadata?: Json;
  publish_status?: string;
  scheduled_publish_at?: string;
  rollback_from?: string;
}

export interface ContentWithAuthor {
  id: string;
  title: string;
  content: Json;
  type: string;
  status: string;
  version: number;
  created_by: {
    display_name: string;
  };
  created_at: string;
  updated_by?: {
    display_name: string;
  };
  updated_at?: string;
  metadata?: Json;
  slug?: string;
}
import { Json } from './base';
import { UserRole } from './base';

export interface ContentWithAuthor {
  id: string;
  title: string;
  content: Json;
  type: string;
  status: ContentStatus;
  created_by: {
    display_name: string;
  };
  updated_by: {
    display_name: string;
  };
  created_at: string;
  updated_at: string;
  metadata?: Json;
  version: number;
  slug?: string;
}
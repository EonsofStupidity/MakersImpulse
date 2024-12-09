import { Database } from './database';

export type BlogPost = Database['public']['Tables']['blog_posts']['Row'];
export type ContentType = Database['public']['Enums']['content_type'];
export type ContentStatus = Database['public']['Enums']['content_status'];
export type PostCategory = Database['public']['Enums']['post_category'];

export interface ContentMetadata {
  title: string;
  description?: string;
  keywords?: string[];
  author?: string;
  publishedAt?: string;
  updatedAt?: string;
}

export interface ContentRelationship {
  id: string;
  parentId: string;
  childId: string;
  type: string;
  orderIndex?: number;
}
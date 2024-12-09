import { Database } from './database';
import { Profile } from './auth';

export type BlogPost = Database['public']['Tables']['blog_posts']['Row'];
export type CMSContent = Database['public']['Tables']['cms_content']['Row'];
export type CMSComponent = Database['public']['Tables']['cms_components']['Row'];
export type CMSCategory = Database['public']['Tables']['cms_categories']['Row'];

export type ContentStatus = Database['public']['Enums']['content_status'];
export type ContentType = Database['public']['Enums']['content_type'];
export type PostCategory = Database['public']['Enums']['post_category'];

export interface ContentRelationship {
  id: string;
  parentId: string;
  childId: string;
  relationshipType: string;
  orderIndex?: number;
}

export interface ContentRevision {
  id: string;
  contentId: string;
  content: any;
  metadata?: Record<string, any>;
  createdBy?: Profile;
  createdAt: string;
}
import { TableDefinition } from './core';
import { Json } from './json';

export interface BlogPostsTable {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  slug: string;
  published_at: string | null;
  updated_at: string | null;
  status: string | null;
  author_id: string | null;
  featured_image: string | null;
  views_count: number | null;
  rich_content: Json | null;
  images: string[] | null;
  tags: string[] | null;
}

export type ContentTables = {
  blog_posts: TableDefinition<BlogPostsTable>;
};
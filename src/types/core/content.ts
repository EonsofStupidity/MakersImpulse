import { Json } from './json';

export type ContentType = 'template' | 'page' | 'component' | 'workflow';
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
  metadata?: Json;
  slug?: string;
  status: ContentStatus;
  version: number;
  created_by: ContentAuthor;
  updated_by?: ContentAuthor;
  created_at: string;
  updated_at?: string;
}

export interface ComponentContent {
  title: string;
  type: "component";
  content: {
    componentType: string;
    props?: Record<string, unknown>;
    styles?: Record<string, unknown>;
  };
  status?: ContentStatus;
  metadata?: Record<string, Json>;
}

export interface PageContent {
  title: string;
  type: "page";
  content: {
    body: string;
    seo?: {
      title?: string;
      description?: string;
      keywords?: string[];
      ogImage?: string;
    };
  };
  status?: ContentStatus;
  metadata?: Record<string, any>;
  id?: string;
  version?: number;
}

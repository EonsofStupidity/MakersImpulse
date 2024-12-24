import { Json } from '../core/json';

export type ContentType = 'template' | 'page' | 'component' | 'workflow';
export type ContentStatus = 'draft' | 'published' | 'archived';

export interface ContentWithAuthor {
  id: string;
  title: string;
  type: ContentType;
  content: Json;
  metadata?: Json;
  slug?: string;
  status: ContentStatus;
  version: number;
  created_by: { 
    id: string;
    display_name: string;
  };
  updated_by?: { 
    id: string;
    display_name: string;
  };
  created_at: string;
  updated_at?: string;
}

export interface ComponentContent {
  title: string;
  type: "component";
  content: {
    componentType: string;
    props?: Record<string, any>;
    styles?: Record<string, any>;
  };
  status?: ContentStatus;
  metadata?: Record<string, any>;
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
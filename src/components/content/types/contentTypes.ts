import { Json } from "@/integrations/supabase/types";

export type ContentType = "page" | "component" | "template" | "workflow";
export type ContentStatus = "draft" | "published" | "archived";

export interface ContentBase {
  id: string;
  title: string;
  type: ContentType;
  status: ContentStatus;
  content: {
    body?: string;
    props?: Record<string, any>;
    styles?: Record<string, any>;
    componentType?: string;
    seo?: {
      title?: string;
      description?: string;
      keywords?: string[];
    };
  };
  slug?: string;
  metadata?: Json;
  created_by: string;
  created_at: string;
  updated_by?: string;
  updated_at?: string;
  version: number;
}

export interface ComponentContent extends ContentBase {
  type: "component";
}

export interface ContentWithAuthor extends Omit<ContentBase, 'created_by'> {
  created_by: {
    display_name: string;
    avatar_url: string;
  };
}

export interface ContentMutationInput {
  title: string;
  type: ContentType;
  status?: ContentStatus;
  content?: {
    body?: string;
    props?: Record<string, any>;
    styles?: Record<string, any>;
    componentType?: string;
    seo?: {
      title?: string;
      description?: string;
      keywords?: string[];
    };
  };
  slug?: string;
  metadata?: Record<string, any>;
  created_by: string;
}
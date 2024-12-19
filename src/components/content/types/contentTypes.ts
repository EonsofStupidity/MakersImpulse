import { Json } from "@/integrations/supabase/types";

export interface ContentWithAuthor {
  id: string;
  title: string;
  content: Json;
  created_by: {
    display_name: string;
    avatar_url: string;
  };
  created_at: string;
  updated_at: string;
  status: 'draft' | 'published' | 'archived';
  type: 'page' | 'component' | 'template' | 'workflow';
  version: number;
  metadata?: Json;
  slug?: string;
}
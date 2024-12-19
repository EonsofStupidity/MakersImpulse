import type { Json } from "@/integrations/supabase/types";

export interface ContentRevision {
  id: string;
  content_id: string;
  content: Json;
  metadata: Json | null;
  created_by: string | null;
  created_at: string;
  version_number: number;
  change_summary?: string;
  rollback_metadata?: Json;
  profiles?: {
    display_name: string;
    avatar_url?: string;
  };
}

export interface RevisionQueryResult {
  data: ContentRevision[] | null;
  error: Error | null;
}

export interface RevisionQueryOptions {
  contentId: string;
  limit?: number;
  orderBy?: 'asc' | 'desc';
}
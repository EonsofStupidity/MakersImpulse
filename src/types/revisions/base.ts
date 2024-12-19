import type { Json } from "@/integrations/supabase/types";

export type RevisionStatus = 'draft' | 'published' | 'archived';
export type RevisionType = 'page' | 'component' | 'template';

export interface RevisionRecord {
  id: string;
  version: number;
  content: RevisionContent;
  metadata: RevisionMetadata;
  author: RevisionAuthor;
  timestamp: string;
  summary?: string;
}

export interface RevisionContent {
  body: string;
  title: string;
  type: RevisionType;
  status: RevisionStatus;
}

export interface RevisionMetadata {
  rollback?: {
    fromVersion: number;
    timestamp: string;
  };
  publishStatus?: string;
  scheduledPublish?: string;
}

export interface RevisionAuthor {
  id: string;
  displayName: string;
}
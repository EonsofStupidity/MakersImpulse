import { BaseEntity, ContentStatus, ContentType, Metadata } from './base';

export interface CMSContent extends BaseEntity {
  type: ContentType;
  title: string;
  slug: string | null;
  content: Record<string, any>;
  metadata: Metadata;
  status: ContentStatus;
  version: number;
}

export interface CMSContentRevision extends BaseEntity {
  content_id: string;
  content: Record<string, any>;
  metadata: Metadata;
}

export interface CMSCategory extends BaseEntity {
  name: string;
  slug: string;
  description?: string;
  parent_id?: string;
  metadata: Metadata;
}

export interface CMSTag {
  id: string;
  name: string;
  slug: string;
  description?: string;
  created_at?: string;
}
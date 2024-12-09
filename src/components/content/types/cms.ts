import { z } from "zod";

export type ContentStatus = "draft" | "published" | "archived";
export type ContentType = "page" | "component" | "template" | "workflow";

export interface BaseContent {
  id: string;
  type: ContentType;
  title: string;
  slug?: string;
  content: Record<string, any>;
  metadata?: Record<string, any>;
  status: ContentStatus;
  version: number;
  created_by?: string;
  updated_by?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ContentRelationship {
  id: string;
  parent_id: string;
  child_id: string;
  relationship_type: string;
  order_index?: number;
}

export interface ContentRevision {
  id: string;
  content_id: string;
  content: Record<string, any>;
  metadata?: Record<string, any>;
  created_by?: string;
  created_at: string;
}

export const contentSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().optional(),
  content: z.record(z.any()),
  metadata: z.record(z.any()).optional(),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  type: z.enum(["page", "component", "template", "workflow"]),
});

export type ContentFormData = z.infer<typeof contentSchema>;
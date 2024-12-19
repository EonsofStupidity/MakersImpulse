import { z } from "zod";
import { Json } from "@/integrations/supabase/types";

export type ContentType = "page" | "component" | "template" | "workflow";

export interface ContentBase {
  id?: string;
  title: string;
  type: ContentType;
  slug?: string;
  content?: {
    body?: string;
    seo?: {
      title?: string;
      description?: string;
      keywords?: string[];
    };
  };
  metadata?: Record<string, any>;
  status?: "draft" | "published" | "archived";
  version?: number;
}

export interface PageContent extends ContentBase {
  type: "page";
}

export interface ComponentContent extends ContentBase {
  type: "component";
}

export const pageContentSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.object({
    body: z.string().optional(),
    seo: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      keywords: z.array(z.string()).optional()
    }).optional()
  }).optional(),
  slug: z.string().optional(),
  status: z.enum(["draft", "published", "archived"]).optional(),
  metadata: z.record(z.any()).optional()
});

export const componentContentSchema = pageContentSchema;

export const getSchemaByType = (type: ContentType) => {
  switch (type) {
    case "page":
      return pageContentSchema;
    case "component":
      return componentContentSchema;
    default:
      return pageContentSchema;
  }
};

export interface ContentWithAuthor {
  id: string;
  title: string;
  content: Json;
  metadata: Json;
  slug: string;
  type: ContentType;
  status: "draft" | "published" | "archived";
  version: number;
  created_at: string;
  updated_at: string;
  created_by: { display_name: string };
  updated_by: { display_name: string };
}
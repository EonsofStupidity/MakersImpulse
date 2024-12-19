import { z } from "zod";
import { Json } from "@/integrations/supabase/types";

export type ContentType = "page" | "component" | "template" | "workflow";

export interface ContentBase {
  id?: string;
  type: ContentType;
  title: string;
  slug?: string;
  content?: {
    body?: string;
    componentType?: string;
    props?: Record<string, any>;
    styles?: Record<string, any>;
    seo?: {
      title?: string;
      description?: string;
      keywords?: string[];
    };
  };
  metadata?: Record<string, any>;
  status?: "draft" | "published" | "archived";
  version?: number;
  created_by: string;
  updated_by?: string;
  created_at?: string;
  updated_at?: string;
}

export interface PageContent extends ContentBase {
  type: "page";
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

export const contentBaseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  type: z.enum(["page", "component", "template", "workflow"]),
  content: z.object({
    body: z.string().optional(),
    componentType: z.string().optional(),
    props: z.record(z.any()).optional(),
    styles: z.record(z.any()).optional(),
    seo: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      keywords: z.array(z.string()).optional(),
    }).optional(),
  }).optional(),
  slug: z.string().optional(),
  metadata: z.record(z.any()).optional(),
  status: z.enum(["draft", "published", "archived"]).optional(),
});

export const pageContentSchema = contentBaseSchema.extend({
  type: z.literal("page"),
});

export const componentContentSchema = contentBaseSchema.extend({
  type: z.literal("component"),
});

export const getSchemaByType = (type: ContentType) => {
  switch (type) {
    case "page":
      return pageContentSchema;
    case "component":
      return componentContentSchema;
    default:
      return contentBaseSchema;
  }
};
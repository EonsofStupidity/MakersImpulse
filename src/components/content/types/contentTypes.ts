import { z } from "zod";

export type ContentType = "template" | "page" | "component" | "workflow";

export type ContentStatus = "draft" | "published" | "archived";

export interface ContentWithAuthor {
  id: string;
  title: string;
  type: ContentType;
  content: any;
  metadata?: any;
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

export const componentContentSchema = z.object({
  title: z.string(),
  type: z.literal("component"),
  content: z.object({
    componentType: z.string(),
    props: z.record(z.any()).optional(),
    styles: z.record(z.any()).optional()
  }),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  metadata: z.record(z.any()).optional()
});

export const pageContentSchema = z.object({
  title: z.string(),
  type: z.literal("page"),
  content: z.object({
    body: z.string(),
    seo: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      keywords: z.array(z.string()).optional(),
      ogImage: z.string().optional()
    }).optional()
  }),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  metadata: z.record(z.any()).optional()
});

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

export const getSchemaByType = (type: ContentType) => {
  switch (type) {
    case "component":
      return componentContentSchema;
    case "page":
      return pageContentSchema;
    default:
      return z.any();
  }
};
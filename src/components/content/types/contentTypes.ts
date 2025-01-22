import { z } from "zod";
import { ContentType, ContentStatus, ContentWithAuthor } from '@/types/core/content';

export const componentContentSchema = z.object({
  title: z.string(),
  type: z.literal("component"),
  content: z.object({
    componentType: z.string(),
    props: z.record(z.any()).optional(),
    styles: z.record(z.any()).optional()
  }),
  status: z.enum(["draft", "published", "archived"] as const).default("draft"),
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
  status: z.enum(["draft", "published", "archived"] as const).default("draft"),
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

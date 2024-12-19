import { z } from "zod";

export type ContentType = "template" | "page" | "component" | "workflow";

export interface ContentWithAuthor {
  id: string;
  title: string;
  type: ContentType;
  content: any;
  metadata?: any;
  slug?: string;
  status: "draft" | "published" | "archived";
  version: number;
  created_by: { display_name: string };
  updated_by?: { display_name: string };
  created_at: string;
  updated_at?: string;
}

export const componentContentSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  props: z.array(z.object({
    name: z.string(),
    type: z.string(),
    required: z.boolean(),
    default: z.any().optional(),
    description: z.string().optional()
  })).optional(),
  styles: z.record(z.string(), z.any()).optional(),
  template: z.string(),
  dependencies: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  category: z.string().optional(),
  isPublic: z.boolean().optional(),
  version: z.string().optional()
});

export const pageContentSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  layout: z.string().optional(),
  components: z.array(z.object({
    id: z.string(),
    type: z.string(),
    props: z.record(z.string(), z.any()).optional(),
    children: z.array(z.any()).optional(),
    styles: z.record(z.string(), z.any()).optional()
  })),
  metadata: z.object({
    seo: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      keywords: z.array(z.string()).optional(),
      ogImage: z.string().optional()
    }).optional(),
    scripts: z.array(z.string()).optional(),
    styles: z.array(z.string()).optional()
  }).optional(),
  settings: z.object({
    isPublic: z.boolean().optional(),
    requiresAuth: z.boolean().optional(),
    cacheStrategy: z.string().optional(),
    customDomain: z.string().optional()
  }).optional()
});

export interface PageContent {
  title: string;
  description?: string;
  layout?: string;
  components: Array<{
    id: string;
    type: string;
    props?: Record<string, any>;
    children?: any[];
    styles?: Record<string, any>;
  }>;
  metadata?: {
    seo?: {
      title?: string;
      description?: string;
      keywords?: string[];
      ogImage?: string;
    };
    scripts?: string[];
    styles?: string[];
  };
  settings?: {
    isPublic?: boolean;
    requiresAuth?: boolean;
    cacheStrategy?: string;
    customDomain?: string;
  };
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

export interface ComponentContent {
  name: string;
  description?: string;
  props?: Array<{
    name: string;
    type: string;
    required: boolean;
    default?: any;
    description?: string;
  }>;
  styles?: Record<string, any>;
  template: string;
  dependencies?: string[];
  tags?: string[];
  category?: string;
  isPublic?: boolean;
  version?: string;
}
import { z } from "zod";
import type { Json } from "@/integrations/supabase/types";

// Base content type schema that all content types extend
export const baseContentTypeSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(1, "Title is required"),
  slug: z.string().optional(),
  metadata: z.record(z.any()).optional(),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  version: z.number().optional(),
});

// Page content type
export const pageContentSchema = baseContentTypeSchema.extend({
  type: z.literal("page"),
  content: z.object({
    body: z.string(),
    seo: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      keywords: z.array(z.string()).optional(),
    }).optional(),
  }),
});

// Component content type
export const componentContentSchema = baseContentTypeSchema.extend({
  type: z.literal("component"),
  content: z.object({
    componentType: z.string(),
    props: z.record(z.any()),
    styles: z.record(z.string()).optional(),
  }),
});

// Template content type
export const templateContentSchema = baseContentTypeSchema.extend({
  type: z.literal("template"),
  content: z.object({
    sections: z.array(z.object({
      id: z.string(),
      type: z.string(),
      content: z.record(z.any()),
    })),
    defaultValues: z.record(z.any()).optional(),
  }),
});

// Workflow content type
export const workflowContentSchema = baseContentTypeSchema.extend({
  type: z.literal("workflow"),
  content: z.object({
    steps: z.array(z.object({
      id: z.string(),
      name: z.string(),
      type: z.string(),
      config: z.record(z.any()),
    })),
    transitions: z.array(z.object({
      from: z.string(),
      to: z.string(),
      conditions: z.array(z.record(z.any())).optional(),
    })).optional(),
  }),
});

// Type definitions
export type BaseContent = z.infer<typeof baseContentTypeSchema>;
export type PageContent = z.infer<typeof pageContentSchema>;
export type ComponentContent = z.infer<typeof componentContentSchema>;
export type TemplateContent = z.infer<typeof templateContentSchema>;
export type WorkflowContent = z.infer<typeof workflowContentSchema>;

export type ContentType = "page" | "component" | "template" | "workflow";
export type ContentTypeSchema = 
  | typeof pageContentSchema 
  | typeof componentContentSchema 
  | typeof templateContentSchema 
  | typeof workflowContentSchema;

// Helper function to get schema by content type
export const getSchemaByType = (type: ContentType): ContentTypeSchema => {
  switch (type) {
    case "page":
      return pageContentSchema;
    case "component":
      return componentContentSchema;
    case "template":
      return templateContentSchema;
    case "workflow":
      return workflowContentSchema;
  }
};
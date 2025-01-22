import { z } from "zod";
import { ContentType, ContentStatus, ContentWithAuthor } from '@/types/core/content';

export const componentContentSchema = z.object({
  title: z.string(),
  type: z.literal("component"),
  content: z.object({
    componentType: z.string(),
    props: z.record(z.unknown()).optional(),
    styles: z.record(z.unknown()).optional()
  }),
  status: z.enum(["draft", "published", "archived"] as const).default("draft"),
  metadata: z.record(z.unknown()).optional()
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
  metadata: z.record(z.unknown()).optional()
});


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

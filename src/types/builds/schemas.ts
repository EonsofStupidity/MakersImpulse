import { z } from "zod";

export const buildVolumeSchema = z.object({
  x: z.number().positive("X dimension must be positive"),
  y: z.number().positive("Y dimension must be positive"),
  z: z.number().positive("Z dimension must be positive"),
  units: z.enum(["mm", "cm", "inches"])
});

export const buildPartSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, "Part name is required"),
  quantity: z.number().int().positive("Quantity must be positive"),
  notes: z.string().optional(),
  attributes: z.record(z.union([z.string(), z.number(), z.boolean()])).optional()
});

export const buildImageSchema = z.object({
  url: z.string().url("Invalid image URL"),
  alt: z.string().optional(),
  caption: z.string().optional()
});

export const buildSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional().nullable(),
  build_volume: buildVolumeSchema.optional().nullable(),
  parts: z.array(buildPartSchema).optional().nullable(),
  images: z.array(buildImageSchema).optional().nullable()
});
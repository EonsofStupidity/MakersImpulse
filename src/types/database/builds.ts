import { z } from "zod";

// Core build volume schema
export const buildVolumeSchema = z.object({
  x: z.number().positive("X dimension must be positive"),
  y: z.number().positive("Y dimension must be positive"),
  z: z.number().positive("Z dimension must be positive"),
  units: z.enum(["mm", "cm", "inches"])
});

// Core build part schema
export const buildPartSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, "Part name is required"),
  quantity: z.number().int().positive("Quantity must be positive"),
  notes: z.string().optional(),
  attributes: z.record(z.union([z.string(), z.number(), z.boolean()])).optional()
});

// Core build image schema
export const buildImageSchema = z.object({
  url: z.string().url("Invalid image URL"),
  alt: z.string().optional(),
  caption: z.string().optional()
});

// Main build schema matching database constraints
export const buildSchema = z.object({
  id: z.string().uuid().optional(),
  user_id: z.string().uuid(),
  name: z.string().min(1, "Name is required"),
  description: z.string().optional().nullable(),
  build_volume: buildVolumeSchema.optional().nullable(),
  parts: z.array(buildPartSchema).optional().nullable(),
  images: z.array(buildImageSchema).optional().nullable(),
  created_at: z.string().optional().nullable()
});

// TypeScript types derived from schemas
export type BuildVolume = z.infer<typeof buildVolumeSchema>;
export type BuildPart = z.infer<typeof buildPartSchema>;
export type BuildImage = z.infer<typeof buildImageSchema>;
export type Build = z.infer<typeof buildSchema>;

// Form data type (omits server-generated fields)
export type BuildFormData = Omit<Build, 'id' | 'user_id' | 'created_at'>;

// API response types
export interface BuildsApiResponse {
  data: Build[] | null;
  error: Error | null;
}

export interface BuildApiResponse {
  data: Build | null;
  error: Error | null;
}
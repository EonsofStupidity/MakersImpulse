import { Json } from '../database/json';

export type BuildVolume = {
  x: number;
  y: number;
  z: number;
  units: 'mm' | 'cm' | 'inches';
};

export type BuildPart = {
  id: string;
  name: string;
  quantity: number;
  notes?: string;
  attributes?: Record<string, string | number | boolean>;
};

export type BuildImage = {
  url: string;
  alt?: string;
  caption?: string;
  isPrimary?: boolean;
};

export interface Build {
  id: string;
  user_id: string;
  name: string;
  description?: string | null;
  build_volume?: BuildVolume | null;
  parts?: BuildPart[] | null;
  images?: BuildImage[] | null;
  created_at?: string | null;
}

export type BuildFormData = Omit<Build, 'id' | 'user_id' | 'created_at'>;

export interface BuildsListResponse {
  data: Build[] | null;
  error: Error | null;
}

export interface BuildResponse {
  data: Build | null;
  error: Error | null;
}

// Validation schemas using zod
import { z } from 'zod';

export const buildVolumeSchema = z.object({
  x: z.number().positive(),
  y: z.number().positive(),
  z: z.number().positive(),
  units: z.enum(['mm', 'cm', 'inches'])
});

export const buildPartSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  quantity: z.number().int().positive(),
  notes: z.string().optional(),
  attributes: z.record(z.union([z.string(), z.number(), z.boolean()])).optional()
});

export const buildImageSchema = z.object({
  url: z.string().url(),
  alt: z.string().optional(),
  caption: z.string().optional(),
  isPrimary: z.boolean().optional()
});

export const buildSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional().nullable(),
  build_volume: buildVolumeSchema.optional().nullable(),
  parts: z.array(buildPartSchema).optional().nullable(),
  images: z.array(buildImageSchema).optional().nullable()
});

// Type for build query params
export interface BuildQueryParams {
  page?: number;
  limit?: number;
  sortBy?: 'created_at' | 'name';
  sortOrder?: 'asc' | 'desc';
  category?: string;
  userId?: string;
}
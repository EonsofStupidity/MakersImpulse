import { z } from "zod";
import type { buildSchema, buildVolumeSchema, buildPartSchema, buildImageSchema } from "./schemas";

// Core types derived from schemas
export type BuildVolume = z.infer<typeof buildVolumeSchema>;
export type BuildPart = z.infer<typeof buildPartSchema>;
export type BuildImage = z.infer<typeof buildImageSchema>;
export type BuildFormData = z.infer<typeof buildSchema>;

// Database model
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

// API response types
export interface BuildsListResponse {
  data: Build[] | null;
  error: Error | null;
}

export interface BuildResponse {
  data: Build | null;
  error: Error | null;
}

// Query parameters
export interface BuildQueryParams {
  page?: number;
  limit?: number;
  sortBy?: 'created_at' | 'name';
  sortOrder?: 'asc' | 'desc';
  userId?: string;
}
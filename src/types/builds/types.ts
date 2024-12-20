import { z } from "zod";

// Core types for the build volume
export interface BuildVolume {
  x: number;
  y: number;
  z: number;
  units: "mm" | "cm" | "inches";
}

// Core types for build parts
export interface BuildPart {
  id: string;
  name: string;
  quantity: number;
  notes?: string;
  attributes?: Record<string, string | number | boolean>;
}

// Core types for build images
export interface BuildImage {
  url: string;
  alt?: string;
  caption?: string;
}

// Database model matching Supabase schema
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

// Form data type (omits server-generated fields)
export type BuildFormData = Omit<Build, 'id' | 'user_id' | 'created_at'>;

// Query parameters for fetching builds
export interface BuildQueryParams {
  page?: number;
  limit?: number;
  sortBy?: 'created_at' | 'name';
  sortOrder?: 'asc' | 'desc';
  userId?: string;
}
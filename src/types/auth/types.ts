import { UserRole } from '../theme/core/types';

export interface AuthUser {
  id: string;
  display_name: string;
  username: string;
  bio?: string;
  website?: string;
  location?: string;
  created_at: string;
  role: UserRole;
  email?: string;
  avatar_url?: string;
}

export interface BuildPart {
  id: string;
  name: string;
  quantity: number;
  notes?: string;
  attributes?: Record<string, any>;
}

export interface BuildImage {
  url: string;
  type: string;
  alt?: string;
  caption?: string;
}

export interface Build {
  id: string;
  user_id: string;
  name: string;
  description: string;
  build_volume: Json;
  parts: BuildPart[];
  images: BuildImage[];
  created_at: string;
}

export interface ContentWithAuthor {
  content: Json;
  created_at: string;
  created_by: { display_name: string };
  updated_by: { display_name: string };
  metadata: Json;
  status: 'draft' | 'published' | 'archived';
  type: 'template' | 'workflow';
  version: number;
}
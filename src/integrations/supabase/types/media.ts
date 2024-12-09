import { Database } from './database';

export type MediaItem = Database['public']['Tables']['media']['Row'];

export interface MediaMetadata {
  fileName: string;
  fileSize: number;
  mimeType: string;
  dimensions?: {
    width: number;
    height: number;
  };
}

export interface StorageOptions {
  bucket?: string;
  path?: string;
  metadata?: Record<string, any>;
}
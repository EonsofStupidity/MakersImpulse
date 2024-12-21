import { ThemeBase } from './types';
import { Json } from '@/types/database';

export interface ThemeFormData extends ThemeBase {
  // Form-specific fields can be added here
}

// Database-specific type that handles JSON serialization
export interface ThemeBaseDB extends Omit<ThemeBase, 'preview_preferences' | 'inherited_settings'> {
  preview_preferences: string; // JSON string in DB
  inherited_settings: string; // JSON string in DB
}
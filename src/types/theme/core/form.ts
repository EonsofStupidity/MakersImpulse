import { ThemeBase } from './base';

// Form-specific type that extends ThemeBase
export interface ThemeFormData extends ThemeBase {
  // Add any form-specific fields here if needed
}

// Database-specific type
export interface ThemeBaseDB extends Omit<ThemeBase, 'preview_preferences' | 'inherited_settings'> {
  preview_preferences: string; // JSON string in DB
  inherited_settings: string; // JSON string in DB
}

// Re-export for convenience
export type { ThemeBase, ThemeFormData };
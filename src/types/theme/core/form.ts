import { ThemeBase, ThemeFormData } from './types';

// Re-export the types from core/types
export type { ThemeBase, ThemeFormData };

// For backward compatibility
export type SettingsFormData = ThemeFormData;
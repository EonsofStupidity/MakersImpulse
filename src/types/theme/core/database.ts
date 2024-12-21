import { ThemeBase } from './types';
import { Json } from '@/types/database/json';

export interface DatabaseThemeRow extends Omit<ThemeBase, 'preview_preferences' | 'inherited_settings'> {
  preview_preferences: string; // JSON string in DB
  inherited_settings: string; // JSON string in DB
}

export type SettingsFormData = Partial<ThemeBase>;
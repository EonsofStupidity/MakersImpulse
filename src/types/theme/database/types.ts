import { ThemeBase } from '../core/types';

export interface ThemeRow extends ThemeBase {
  id: string;
  created_at?: string;
  updated_at?: string;
  state_version?: number;
  last_sync?: string;
  parent_theme_id?: string | null;
}

export interface ThemeConfigurationRow extends ThemeRow {
  state_version: number;
  last_sync: string;
}

export type ThemeInheritanceStrategy = 'merge' | 'override' | 'replace';
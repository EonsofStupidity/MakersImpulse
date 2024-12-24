import { ThemeBase, ThemeConfigurationRow } from '../theme/core/types';

export interface TableDefinition<T> {
  Row: T;
  Insert: Partial<T>;
  Update: Partial<T>;
}

export type ThemeTable = TableDefinition<ThemeConfigurationRow>;
export type ActivityTable = TableDefinition<ActivityRow>;
export type MediaTable = TableDefinition<MediaRow>;

export interface ActivityRow {
  id: string;
  user_id: string;
  action: string;
  details: string;
  created_at: string;
}

export interface SecurityLogRow extends ActivityRow {
  severity: 'info' | 'warning' | 'error';
  metadata: Json;
}

export interface MediaRow {
  id: string;
  url: string;
  type: string;
  created_at: string;
}
import { Json } from '@/types/core/json';
import { ThemeBase } from '@/types/theme/core/types';

export type SettingType = 'theme' | 'security' | 'content' | 'system' | 'user' | 'notification' | 'workflow';

export interface UnifiedSetting<T = Json> extends BaseEntity {
  category: SettingType;
  key: string;
  value: T;
  is_encrypted: boolean;
  created_by?: string;
  updated_by?: string;
}

interface BaseEntity {
  id: string;
  created_at?: string;
  updated_at?: string;
  metadata?: Json;
}

export type { ThemeBase };
import { Json } from '@/types/database/json';
import { BaseEntity } from '../core/common';

export type SettingType = 'theme' | 'security' | 'content' | 'system' | 'user' | 'notification' | 'workflow';

export interface UnifiedSetting<T = Json> extends BaseEntity {
  category: SettingType;
  key: string;
  value: T;
  is_encrypted: boolean;
  created_by?: string;
  updated_by?: string;
}

export * from './theme';
export * from './security';
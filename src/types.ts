import { UseFormReturn as HookFormReturn } from 'react-hook-form';

// Core Types
import { UserRole } from '@/types/core/auth';
import { ContentStatus } from '@/types/core/content';

import { 
  ThemeMode,
  TransitionType,
  ThemeInheritanceStrategy,
  GlassEffectLevel,
  ThemeBase
} from '@/types/core/theme';

export type {
  ThemeMode,
  TransitionType,
  ThemeInheritanceStrategy,
  GlassEffectLevel
};
export type CSSUnit = 'px' | 'rem' | 'em' | 'vh' | 'vw' | '%' | '';
export type CSSValue = `${number}${CSSUnit}` | string;
export type SettingType = 'theme' | 'system' | 'user' | 'content' | 'workflow' | 'security' | 'notification';

import { Json } from '@/types/core/json';
export type UseFormReturn<T = unknown> = HookFormReturn<T>;

export interface Settings extends ThemeBase {
  category: SettingType;
  key: string;
  value: Json;
  metadata?: Json;
  is_encrypted?: boolean;
  component_type?: ComponentType;
}

import { Build, BuildVolume, BuildPart, BuildImage, BuildQueryParams } from '@/types/builds/core';

export interface BuildFormData extends Omit<Build, 'id' | 'createdAt'> {
  buildVolume: BuildVolume;
  userId: string;
}

import { Profile, AuthUser } from '@/types/core/auth';



export interface ThemeStyles {
  [key: string]: string;
}

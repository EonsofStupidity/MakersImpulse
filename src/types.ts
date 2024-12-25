// Core Types
export type ThemeMode = 'light' | 'dark' | 'system';
export type TransitionType = 'fade' | 'slide' | 'scale' | 'blur';
export type ThemeInheritanceStrategy = 'merge' | 'override' | 'replace';
export type ComponentType = 'color' | 'typography' | 'layout' | 'animation' | 'effect';
export type GlassEffectLevel = 'low' | 'medium' | 'high';
export type UserRole = 'admin' | 'editor' | 'user' | 'subscriber';
export type ContentStatus = 'draft' | 'published' | 'archived';
export type CSSUnit = 'px' | 'rem' | 'em' | 'vh' | 'vw' | '%' | '';
export type CSSValue = `${number}${CSSUnit}` | string;
export type SettingType = 'theme' | 'system' | 'user';

// JSON Type
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

// Auth Types
export interface AuthUser {
  id: string;
  email: string;
  displayName?: string;
  username?: string;
  bio?: string;
  website?: string;
  location?: string;
  createdAt: Date;
  updatedAt: Date;
  role: UserRole;
  avatar_url?: string;
  last_seen?: string;
  metadata?: Record<string, unknown>;
}

// Profile Types
export interface Profile {
  id: string;
  username?: string;
  display_name?: string;
  avatar_url?: string;
  bio?: string;
  website?: string;
  location?: string;
  created_at?: string;
  updated_at?: string;
  role?: UserRole;
  last_seen?: string;
  metadata?: Record<string, unknown>;
}

// CSS Effects Control Props
export interface CSSEffectsControlProps {
  label: string;
  type: string;
  value: string | number;
  onChange: (value: string | number) => void;
  min?: number;
  max?: number;
  step?: number;
  options?: Array<{ label: string; value: string }>;
  description?: string;
  className?: string;
}

// Theme Base
export interface ThemeBase {
  id?: string;
  colors?: {
    primary: string;
    secondary: string;
    accent: string;
    text: {
      primary: string;
      secondary: string;
      heading: string;
    };
    neon: {
      cyan: string;
      pink: string;
      purple: string;
    };
  };
  typography?: {
    fontFamilyHeading: string;
    fontFamilyBody: string;
    fontSizeBase: string;
    fontWeightNormal: string;
    fontWeightBold: string;
    lineHeightBase: string;
    letterSpacing: string;
  };
  effects?: {
    borderRadius: string;
    spacingUnit: string;
    transitionDuration: string;
    shadowColor: string;
    hoverScale: string;
    boxShadow: string;
    backdropBlur: string;
  };
  spacing?: {
    unit: string;
    scale: Record<string, string>;
  };
  animations?: {
    enabled: boolean;
    duration: number;
    type: TransitionType;
  };
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  text_primary_color: string;
  text_secondary_color: string;
  text_link_color: string;
  text_heading_color: string;
  neon_cyan: string;
  neon_pink: string;
  neon_purple: string;
  font_family_heading: string;
  font_family_body: string;
  font_size_base: string | number;
  font_weight_normal: string | number;
  font_weight_bold: string | number;
  line_height_base: string | number;
  letter_spacing: string;
  border_radius: string;
  spacing_unit: string;
  transition_duration: string | number;
  shadow_color: string;
  hover_scale: string | number;
  box_shadow: string;
  backdrop_blur: string | number;
  theme_mode: ThemeMode;
  transition_type: TransitionType;
  animations_enabled: boolean;
  default_animation_duration: number;
  real_time_toggle?: boolean;
  component_type?: ComponentType;
  preview_preferences?: {
    real_time_updates: boolean;
    animation_enabled: boolean;
    glass_effect_level: GlassEffectLevel;
    update_debounce_ms: number;
  };
  parent_theme_id?: string | null;
  inheritance_strategy?: ThemeInheritanceStrategy;
  inherited_settings?: Json;
  site_title?: string;
  tagline?: string;
  logo_url?: string;
  favicon_url?: string;
  updated_at?: string;
  updated_by?: string;
}

// Build Types
export interface BuildVolume {
  x: number;
  y: number;
  z: number;
  units: string;
}

export interface BuildPart {
  id: string;
  name: string;
  quantity: number;
  notes?: string;
  attributes?: Record<string, unknown>;
}

export interface BuildImage {
  url: string;
  type: string;
  alt?: string;
  caption?: string;
}

export interface Build {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  build_volume: BuildVolume;
  parts: BuildPart[];
  images: BuildImage[];
  created_at: string;
}

export interface BuildFormData extends Omit<Build, 'id' | 'created_at'> {}

export interface BuildQueryParams {
  userId?: string;
  sort?: string;
  order?: 'asc' | 'desc';
}

// Settings Types
export interface Settings {
  id: string;
  category: SettingType;
  key: string;
  value: Json;
  metadata?: Record<string, unknown>;
  is_encrypted?: boolean;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  updated_by?: string;
}

export type SettingsFormData = ThemeBase;

// Theme State Types
export interface ThemeState extends ThemeBase {
  isDirty?: boolean;
  lastSync?: Date | null;
  syncStatus?: 'idle' | 'syncing' | 'error';
  syncError?: string;
}

export interface ThemeLifecycleState {
  status: 'initializing' | 'ready' | 'error' | 'deactivating';
  error?: string;
}

export interface ThemeSyncState {
  status: 'pending' | 'syncing' | 'completed' | 'error';
  last_sync: string;
  error?: string;
}

// Content Types
export interface ContentWithAuthor {
  id: string;
  title: string;
  content: Json;
  type: string;
  status: ContentStatus;
  created_by: {
    display_name: string;
  };
  updated_by: {
    display_name: string;
  };
  created_at: string;
  updated_at: string;
  metadata?: Json;
  version: number;
  slug?: string;
}

// Theme Styles
export interface ThemeStyles {
  colors: Record<string, string>;
  typography: Record<string, string>;
  spacing: Record<string, string>;
  effects: Record<string, string>;
}

// Application Settings
export interface ApplicationSettings extends ThemeBase {
  // Add any additional application settings here
}

// Schema
export const buildSchema = {};

// Form Types
export type UseFormReturn<T> = {
  watch: (name?: string) => any;
  setValue: (name: string, value: any) => void;
  getValues: () => T;
  reset: (values?: T) => void;
  getFieldState: (name: string) => any;
  setError: (name: string, error: any) => void;
  clearErrors: () => void;
  trigger: (name?: string) => Promise<boolean>;
  formState: any;
  control: any;
  handleSubmit: (onSubmit: (data: T) => void) => (e: React.FormEvent) => void;
};

// Export all types from other modules
export * from './types/auth/types';
export * from './types/builds/types';
export * from './types/content/types';
export * from './types/database/core';
export * from './types/database/settings';
export * from './types/revisions/base';
export * from './types/security';
export * from './types/security/types';
import { UseFormReturn as HookFormReturn } from 'react-hook-form';

// Core Types
export type ThemeMode = 'light' | 'dark' | 'system';
export type TransitionType = 'fade' | 'slide' | 'scale' | 'blur';
export type ThemeInheritanceStrategy = 'merge' | 'override' | 'replace';
export type ComponentType = 'color' | 'typography' | 'layout' | 'animation' | 'effect';
export type GlassEffectLevel = 'low' | 'medium' | 'high';
export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin';
export type ContentStatus = 'draft' | 'published' | 'archived';
export type CSSUnit = 'px' | 'rem' | 'em' | 'vh' | 'vw' | '%' | '';
export type CSSValue = `${number}${CSSUnit}` | string;
export type SettingType = 'theme' | 'system' | 'user' | 'content' | 'workflow' | 'security' | 'notification';

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type UseFormReturn<T = any> = HookFormReturn<T>;

export interface ThemePreviewPreferences {
  real_time_updates: boolean;
  animation_enabled: boolean;
  glass_effect_level: GlassEffectLevel;
  update_debounce_ms: number;
}

export interface ThemeValidationError {
  field: string;
  message: string;
  code?: string;
}

export interface ThemeValidationResult {
  isValid: boolean;
  errors: ThemeValidationError[];
}

export interface ThemeSyncState {
  lastSync: string | null;
  syncStatus: 'idle' | 'syncing' | 'error';
  syncError?: string;
  status?: 'idle' | 'syncing' | 'error';
}

export interface ThemeBase {
  id?: string;
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
  font_size_base: string;
  font_weight_normal: string;
  font_weight_bold: string;
  line_height_base: string;
  letter_spacing: string;
  border_radius: string;
  spacing_unit: string;
  transition_duration: string;
  shadow_color: string;
  hover_scale: string;
  box_shadow: string;
  backdrop_blur: string;
  theme_mode: ThemeMode;
  transition_type: TransitionType;
  real_time_toggle?: boolean;
  component_type?: ComponentType;
  preview_preferences: ThemePreviewPreferences;
  parent_theme_id?: string | null;
  inheritance_strategy?: ThemeInheritanceStrategy;
  inherited_settings?: Json;
  site_title?: string;
  tagline?: string;
  logo_url?: string;
  favicon_url?: string;
  updated_at?: string;
  updated_by?: string;
  created_at?: string;
  created_by?: string;
  animations_enabled: boolean;
  default_animation_duration: number;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    text: {
      primary: string;
      secondary: string;
      heading: string;
      link: string;
    };
    neon: {
      cyan: string;
      pink: string;
      purple: string;
    };
  };
  typography: {
    fontFamily: {
      heading: string;
      body: string;
    };
    fontSize: {
      base: string;
    };
    fontWeight: {
      normal: string;
      bold: string;
    };
    lineHeight: {
      base: string;
    };
    letterSpacing: string;
  };
  effects: {
    borderRadius: string;
    boxShadow: string;
    backdropBlur: string;
    shadowColor: string;
  };
  spacing: {
    unit: string;
  };
  animations: {
    enabled: boolean;
    duration: number;
  };
}

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
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  sort?: string;
  order?: string;
}

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

export interface Settings extends ThemeBase {
  category: SettingType;
  key: string;
  value: Json;
  metadata?: Json;
  is_encrypted?: boolean;
}

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

export interface UserTableRowActionsProps {
  onRoleChange: (userId: string, newRole: UserRole) => void;
  user: Profile;
}

export interface BuildFormContainerProps {
  form: UseFormReturn<BuildFormData>;
  onSubmit: (data: BuildFormData) => void;
}

export interface BuildImagesSectionProps {
  images: BuildImage[];
  onImagesChange: (images: BuildImage[]) => void;
}

export interface ThemeStyles {
  [key: string]: string;
}

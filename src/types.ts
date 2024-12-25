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

// JSON Type
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

// Theme Validation Types
export interface ThemeValidationError {
  field: string;
  message: string;
  code: string;
}

export interface ThemeValidationResult {
  isValid: boolean;
  errors: ThemeValidationError[];
}

// Theme Base
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
  created_at?: string;
  created_by?: string;
  colors?: {
    primary: string;
    secondary: string;
    accent: string;
    text: {
      primary: string;
      secondary: string;
      link: string;
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
    shadowColor: string;
    hoverScale: string;
    boxShadow: string;
    backdropBlur: string;
  };
  spacing?: {
    unit: string;
  };
  animations?: {
    enabled: boolean;
    duration: number;
  };
}

// Theme State Types
export interface ThemeState extends ThemeBase {
  isLoading: boolean;
  error: string | null;
  isDirty?: boolean;
  lastSync?: string;
  syncStatus?: string;
  syncError?: string;
}

// Theme Sync State
export interface ThemeSyncState {
  status: 'pending' | 'syncing' | 'completed' | 'error';
  lastSync?: string;
  error?: string;
}

// Theme Styles
export interface ThemeStyles {
  '--primary-color': string;
  '--secondary-color': string;
  '--accent-color': string;
  '--text-primary-color': string;
  '--text-secondary-color': string;
  '--text-link-color': string;
  '--text-heading-color': string;
  '--neon-cyan': string;
  '--neon-pink': string;
  '--neon-purple': string;
  '--font-family-heading': string;
  '--font-family-body': string;
  '--font-size-base': string;
  '--font-weight-normal': string;
  '--font-weight-bold': string;
  '--line-height-base': string;
  '--letter-spacing': string;
  '--border-radius': string;
  '--spacing-unit': string;
  '--transition-duration': string;
  '--shadow-color': string;
  '--hover-scale': string;
  '--box-shadow': string;
  '--backdrop-blur': string;
}

// CSS Effects Control Props
export interface CSSEffectsControlProps {
  label: string;
  type: 'slider' | 'select' | 'input';
  value: string | number;
  onChange: (value: string | number) => void;
  min?: number;
  max?: number;
  step?: number;
  options?: Array<{ label: string; value: string }>;
  description?: string;
  className?: string;
}

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

// Form Types
export type UseFormReturn<T> = {
  watch: UseFormWatch<T>;
  setValue: (name: keyof T, value: any) => void;
  getValues: () => T;
  reset: (values?: T) => void;
  getFieldState: (name: keyof T) => any;
  setError: (name: keyof T, error: any) => void;
  clearErrors: () => void;
  trigger: (name?: keyof T) => Promise<boolean>;
  formState: any;
  control: any;
  handleSubmit: (onSubmit: (data: T) => void) => (e: React.FormEvent) => void;
  resetField: (name: keyof T) => void;
  unregister: (name: keyof T) => void;
  register: (name: keyof T) => void;
  setFocus: (name: keyof T) => void;
};

type UseFormWatch<T> = (names?: keyof T | (keyof T)[]) => any;

// Props Types
export interface UserTableRowActionsProps {
  user: Profile;
}

export interface BuildFormContainerProps {
  onSubmit: (data: Build) => void;
}

export interface BuildImagesSectionProps {
  images: BuildImage[];
  onImagesChange: (images: BuildImage[]) => void;
  form: UseFormReturn<Build>;
}

export interface FormActionsProps {
  isSubmitting: boolean;
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

// Settings Types
export interface Settings extends ThemeBase {
  category: SettingType;
  key: string;
  value: Json;
  metadata?: Json;
  is_encrypted?: boolean;
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

export interface BuildFormData extends Omit<Build, 'id' | 'user_id' | 'created_at'> {}

export interface BuildQueryParams {
  userId?: string;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  sort?: string;
  order?: string;
}

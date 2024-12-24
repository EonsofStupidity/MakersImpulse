import { Json } from '@/types/core/json';

// Core enums
export type ThemeMode = 'light' | 'dark' | 'system';
export type ThemeComponentType = 'color' | 'typography' | 'layout' | 'animation' | 'effect';
export type TransitionType = 'fade' | 'slide' | 'scale' | 'blur';
export type ThemeInheritanceStrategy = 'merge' | 'override' | 'replace';
export type GlassEffectLevel = 'low' | 'medium' | 'high';

// Strictly typed preview preferences
export interface PreviewPreferences {
  real_time_updates: boolean;
  animation_enabled: boolean;
  glass_effect_level: GlassEffectLevel;
  update_debounce_ms: number;
  [key: string]: unknown; // Allow additional properties
}

// Validation types
export interface ThemeValidationError {
  field: string;
  message: string;
  code?: string; // Make code optional to fix validation errors
}

export interface ThemeValidationResult {
  isValid: boolean;
  errors: ThemeValidationError[];
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

// Base theme interface with explicit property types and index signature
export interface ThemeBase {
  id?: string;
  site_title: string;
  tagline?: string;
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
  component_type?: ThemeComponentType;
  real_time_toggle: boolean;
  animations_enabled: boolean;
  default_animation_duration: number;
  preview_preferences: PreviewPreferences;
  parent_theme_id?: string;
  inheritance_strategy: ThemeInheritanceStrategy;
  inherited_settings: Record<string, unknown>;
  logo_url?: string;
  favicon_url?: string;
  updated_at?: string;
  updated_by?: string;
  [key: string]: unknown; // Add index signature to allow additional properties
}

// Database row type with additional fields
export interface ThemeConfigurationRow extends ThemeBase {
  state_version: number;
  last_sync: string;
}

// Type aliases for form data and settings
export type ThemeFormData = ThemeBase;
export type SettingsFormData = ThemeBase;
export type Settings = ThemeBase;
export type Theme = ThemeBase;

// Response type for settings
export interface SettingsResponse<T = any> {
  id: string;
  value: T;
}

// Content types
export interface ContentWithAuthor {
  id: string;
  title: string;
  content: Json;
  created_by: {
    display_name: string;
  };
  created_at: string;
  updated_at: string;
  status: 'draft' | 'published' | 'archived';
  type: 'template' | 'component' | 'page' | 'workflow';
  version: number;
  metadata: Json;
  slug: string;
  updated_by?: string;
}

// Build types
export interface BuildVolume {
  x: number;
  y: number;
  z: number;
  units: string;
}

export interface Build {
  id: string;
  userId: string;
  name: string;
  description: string;
  buildVolume: BuildVolume;
  parts: Json;
  images: Json;
  createdAt: string;
}

// Auth types
export interface AuthUser {
  id: string;
  email: string;
  displayName?: string;
  bio?: string;
  website?: string;
  location?: string;
  created_at?: string;
  role?: 'subscriber' | 'maker' | 'admin' | 'super_admin';
}
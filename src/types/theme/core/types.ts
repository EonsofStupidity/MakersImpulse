export type ThemeMode = 'light' | 'dark' | 'system';
export type TransitionType = 'fade' | 'slide' | 'scale' | 'blur';
export type ThemeInheritanceStrategy = 'merge' | 'override' | 'replace';
export type GlassEffectLevel = 'low' | 'medium' | 'high';
export type ThemeComponentType = 'color' | 'typography' | 'layout' | 'animation' | 'effect';

export interface PreviewPreferences {
  real_time_updates: boolean;
  animation_enabled: boolean;
  glass_effect_level: GlassEffectLevel;
  update_debounce_ms: number;
}

// Base theme interface that matches database structure
export interface ThemeBase {
  // Site Configuration
  site_title: string;
  tagline?: string;
  logo_url?: string;
  favicon_url?: string;

  // Colors
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

  // Typography
  font_family_heading: string;
  font_family_body: string;
  font_size_base: string;
  font_weight_normal: string;
  font_weight_bold: string;
  line_height_base: string;
  letter_spacing: string;

  // Layout & Spacing
  border_radius: string;
  spacing_unit: string;
  transition_duration: string;
  shadow_color: string;
  hover_scale: string;
  box_shadow: string;
  backdrop_blur: string;

  // Theme Configuration
  theme_mode: ThemeMode;
  transition_type: TransitionType;
  real_time_toggle: boolean;
  animations_enabled: boolean;
  default_animation_duration: number;
  preview_preferences: PreviewPreferences;
  parent_theme_id?: string;
  inheritance_strategy: ThemeInheritanceStrategy;
  inherited_settings: Record<string, any>;
  component_type?: ThemeComponentType;
}

// Database row type
export interface ThemeConfigurationRow extends ThemeBase {
  id: string;
  created_at?: string;
  updated_at?: string;
  updated_by?: string;
  state_version?: number;
  last_sync?: string;
}

// Settings form data type
export interface SettingsFormData extends ThemeBase {
  id?: string;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  updated_by?: string;
}

// Theme state type
export interface ThemeState extends ThemeBase {
  isDirty: boolean;
  lastSync: Date | null;
  syncStatus: 'idle' | 'syncing' | 'error';
  syncError?: string;
  isPreviewMode: boolean;
  localChanges: Partial<ThemeBase>;
}

// Theme lifecycle state type
export interface ThemeLifecycleState {
  status: 'initializing' | 'ready' | 'error' | 'deactivating';
  error?: string;
}

// Theme sync state type
export interface ThemeSyncState {
  status: 'pending' | 'syncing' | 'completed' | 'error';
  last_sync?: string;
  error?: string;
}

// Theme validation types
export interface ThemeValidationError {
  field: string;
  message: string;
  code: string;
}

export interface ThemeValidationResult {
  isValid: boolean;
  errors: ThemeValidationError[];
}

// CSS types
export type CSSUnit = 'px' | 'rem' | 'em' | 'vh' | 'vw' | '%' | '';
export type CSSValue = `${number}${CSSUnit}`;
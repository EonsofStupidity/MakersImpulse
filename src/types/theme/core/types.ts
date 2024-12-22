import { Json } from "@/types/database/json";

export type ThemeMode = 'light' | 'dark' | 'system';
export type ThemeComponentType = 'color' | 'typography' | 'layout' | 'animation' | 'effect';
export type TransitionType = 'fade' | 'slide' | 'scale' | 'blur';
export type ThemeInheritanceStrategy = 'merge' | 'override' | 'replace';
export type GlassEffectLevel = 'low' | 'medium' | 'high';

export interface PreviewPreferences {
  real_time_updates: boolean;
  animation_enabled: boolean;
  glass_effect_level: GlassEffectLevel;
  update_debounce_ms: number;
}

// Theme-specific interface for styling configuration
export interface ThemeBase {
  id?: string;
  // Theme Metadata
  site_title: string;
  tagline: string;
  
  // Brand Colors
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  
  // Text Colors
  text_primary_color: string;
  text_secondary_color: string;
  text_link_color: string;
  text_heading_color: string;
  
  // Special Effects
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
  
  // Transitions & Animations
  transition_duration: string;
  shadow_color: string;
  hover_scale: string;
  box_shadow: string;
  backdrop_blur: string;
  theme_mode: ThemeMode;
  transition_type: TransitionType;
  component_type?: ThemeComponentType;
  
  // Features
  real_time_toggle: boolean;
  animations_enabled: boolean;
  default_animation_duration: number;
  
  // Theme System
  preview_preferences: PreviewPreferences;
  parent_theme_id?: string;
  inheritance_strategy: ThemeInheritanceStrategy;
  inherited_settings: Json;
  
  // Assets
  logo_url?: string;
  favicon_url?: string;
  
  // Metadata
  updated_at?: string;
  updated_by?: string;
}

export type Theme = ThemeBase;
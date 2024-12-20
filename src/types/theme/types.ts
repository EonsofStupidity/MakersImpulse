import { Json } from '@/integrations/supabase/types';

export type ThemeMode = 'light' | 'dark' | 'system';

export type ThemeComponentType = 
  | 'color'
  | 'typography'
  | 'layout'
  | 'animation'
  | 'effect';

export interface SecuritySettings {
  ip_blacklist: string[];
  ip_whitelist: string[];
  max_login_attempts: number;
  rate_limit_requests: number;
  session_timeout_minutes: number;
  lockout_duration_minutes: number;
  rate_limit_window_minutes: number;
}

export interface ThemeBase {
  id?: string;
  site_title: string;
  tagline: string;
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
  box_shadow?: string;
  backdrop_blur?: string;
  transition_type?: 'fade' | 'slide' | 'scale' | 'blur';
  menu_animation_type?: 'fade' | 'slide-down' | 'scale' | 'blur';
  theme_mode?: ThemeMode;
  component_type?: ThemeComponentType;
  logo_url?: string;
  favicon_url?: string;
  updated_at?: string;
  updated_by?: string;
  security_settings?: SecuritySettings;
  state_version?: number;
  last_sync?: string;
}

export interface SettingsResponse {
  success: boolean;
  data: ThemeBase;
}

export type SettingsFormData = Partial<ThemeBase>;
export type Settings = ThemeBase;

export interface ThemeContextType {
  theme: ThemeBase | null;
  updateTheme: (newTheme: ThemeBase) => Promise<void>;
}

export interface DatabaseSettingsRow extends ThemeBase {
  id: string;
  updated_at?: string;
  updated_by?: string;
  state_version?: number;
  last_sync?: string;
}
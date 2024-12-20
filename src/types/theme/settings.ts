import type { Json } from '@/integrations/supabase/types/base';

export interface BaseThemeProperties {
  id?: string;
  site_title: string;
  tagline?: string;
  primary_color?: string;
  secondary_color?: string;
  accent_color?: string;
  text_primary_color?: string;
  text_secondary_color?: string;
  text_link_color?: string;
  text_heading_color?: string;
  neon_cyan?: string;
  neon_pink?: string;
  neon_purple?: string;
  font_family_heading: string;
  font_family_body: string;
  font_size_base: string;
  font_weight_normal: string;
  font_weight_bold: string;
  line_height_base: string;
  letter_spacing: string;
  border_radius?: string;
  spacing_unit?: string;
  transition_duration?: string;
  shadow_color?: string;
  hover_scale?: string;
  box_shadow?: string;
  backdrop_blur?: string;
  theme_mode?: 'light' | 'dark' | 'system';
  component_type?: 'color' | 'typography' | 'layout' | 'animation' | 'effect';
}

export interface Settings extends BaseThemeProperties {
  security_settings?: {
    ip_blacklist: string[];
    ip_whitelist: string[];
    max_login_attempts: number;
    rate_limit_requests: number;
    session_timeout_minutes: number;
    lockout_duration_minutes: number;
    rate_limit_window_minutes: number;
  };
}

export interface ThemeContextValue {
  theme: Settings | null;
  updateTheme: (newTheme: Partial<Settings>) => Promise<void>;
}

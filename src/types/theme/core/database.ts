// Database-level types that exactly match the Supabase schema
export interface RawSiteSettingsRow {
  id: string;
  site_title: string;
  tagline: string | null;
  primary_color: string | null;
  secondary_color: string | null;
  accent_color: string | null;
  text_primary_color: string | null;
  text_secondary_color: string | null;
  text_link_color: string | null;
  text_heading_color: string | null;
  font_family_heading: string;
  font_family_body: string;
  font_size_base: string;
  font_weight_normal: string;
  font_weight_bold: string;
  line_height_base: string;
  letter_spacing: string;
  border_radius: string | null;
  spacing_unit: string | null;
  shadow_color: string | null;
  hover_scale: string | null;
  transition_duration: string | null;
  logo_url: string | null;
  favicon_url: string | null;
  updated_at: string | null;
  updated_by: string | null;
  neon_cyan: string;
  neon_pink: string;
  neon_purple: string;
  security_settings: DbSecuritySettings | null;
  state_version: number | null;
  last_sync: string | null;
  theme_mode: string | null;
  component_type: string | null;
}

export interface DbSecuritySettings {
  ip_blacklist: string[];
  ip_whitelist: string[];
  max_login_attempts: number;
  rate_limit_requests: number;
  session_timeout_minutes: number;
  lockout_duration_minutes: number;
  rate_limit_window_minutes: number;
}

export interface DbSiteSettingsInsert extends Omit<RawSiteSettingsRow, 'id' | 'updated_at' | 'state_version' | 'last_sync'> {}
export interface DbSiteSettingsUpdate extends Partial<RawSiteSettingsRow> {}
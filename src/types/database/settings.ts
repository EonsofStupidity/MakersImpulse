import { TableDefinition } from './core';
import { ThemeMode, ThemeComponentType } from '../theme/types';

export interface SiteSettingsTable {
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
  neon_cyan: string | null;
  neon_pink: string | null;
  neon_purple: string | null;
  theme_mode: ThemeMode | null;
  component_type: ThemeComponentType | null;
}

export type SettingsTables = {
  site_settings: TableDefinition<SiteSettingsTable>;
};
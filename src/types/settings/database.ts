import { SecuritySettings } from "../theme/types";

/**
 * Represents the exact structure of the site_settings database table
 */
export interface DatabaseSettings {
  // Required fields (matches NOT NULL in database)
  id: string;
  site_title: string;
  font_family_heading: string;
  font_family_body: string;
  font_size_base: string;
  font_weight_normal: string;
  font_weight_bold: string;
  line_height_base: string;
  letter_spacing: string;

  // Optional fields (nullable in database)
  tagline?: string;
  primary_color?: string;
  secondary_color?: string;
  accent_color?: string;
  text_primary_color?: string;
  text_secondary_color?: string;
  text_link_color?: string;
  text_heading_color?: string;
  border_radius?: string;
  spacing_unit?: string;
  transition_duration?: string;
  shadow_color?: string;
  hover_scale?: string;
  box_shadow?: string;
  backdrop_blur?: string;
  
  // Fields with defaults in database
  neon_cyan?: string;  // default: '#41f0db'
  neon_pink?: string;  // default: '#ff0abe'
  neon_purple?: string; // default: '#8000ff'
  
  // Complex types
  security_settings?: SecuritySettings;
  
  // Metadata
  updated_at?: string;
  updated_by?: string;
  state_version?: number;
  last_sync?: string;
  theme_mode?: 'light' | 'dark' | 'system';
  component_type?: 'color' | 'typography' | 'layout' | 'animation' | 'effect';
}

/**
 * Type for form inputs (omits server-generated fields)
 */
export type SettingsFormData = Omit<DatabaseSettings, 
  'id' | 
  'updated_at' | 
  'updated_by' | 
  'state_version' | 
  'last_sync'
>;

/**
 * Type for theme context
 */
export interface ThemeContextValue {
  theme: DatabaseSettings | null;
  updateTheme: (newTheme: Partial<DatabaseSettings>) => Promise<void>;
}
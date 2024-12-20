import { ThemeMode, ThemeComponentType, TransitionType } from './types';

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
  border_radius?: string;
  spacing_unit?: string;
  transition_duration?: string;
  shadow_color?: string;
  hover_scale?: string;
  box_shadow?: string;
  backdrop_blur?: string;
  transition_type?: TransitionType;
  theme_mode?: ThemeMode;
  component_type?: ThemeComponentType;
  logo_url?: string;
  favicon_url?: string;
  updated_at?: string;
  updated_by?: string;
  state_version?: number;
  last_sync?: string;
}

export const cssVarMapping: Record<keyof ThemeBase, string> = {
  primary_color: '--primary',
  secondary_color: '--secondary',
  accent_color: '--accent',
  text_primary_color: '--foreground',
  text_secondary_color: '--muted-foreground',
  text_link_color: '--link',
  text_heading_color: '--heading',
  neon_cyan: '--neon-cyan',
  neon_pink: '--neon-pink',
  neon_purple: '--neon-purple',
  font_family_heading: '--font-family-heading',
  font_family_body: '--font-family-body',
  font_size_base: '--font-size-base',
  font_weight_normal: '--font-weight-normal',
  font_weight_bold: '--font-weight-bold',
  line_height_base: '--line-height-base',
  letter_spacing: '--letter-spacing',
  border_radius: '--border-radius',
  spacing_unit: '--spacing-unit',
  transition_duration: '--transition-duration',
  shadow_color: '--shadow-color',
  hover_scale: '--hover-scale',
  box_shadow: '--box-shadow',
  backdrop_blur: '--backdrop-blur',
  // These don't map to CSS variables
  id: '',
  site_title: '',
  tagline: '',
  theme_mode: '',
  component_type: '',
  transition_type: '',
  logo_url: '',
  favicon_url: '',
  updated_at: '',
  updated_by: '',
  state_version: '',
  last_sync: ''
};

export const DEFAULT_THEME: ThemeBase = {
  site_title: 'MakersImpulse',
  primary_color: '#7FFFD4',
  secondary_color: '#FFB6C1',
  accent_color: '#E6E6FA',
  text_primary_color: '#FFFFFF',
  text_secondary_color: '#A1A1AA',
  text_link_color: '#3B82F6',
  text_heading_color: '#FFFFFF',
  neon_cyan: '#41f0db',
  neon_pink: '#ff0abe',
  neon_purple: '#8000ff',
  font_family_heading: 'Inter',
  font_family_body: 'Inter',
  font_size_base: '16px',
  font_weight_normal: '400',
  font_weight_bold: '700',
  line_height_base: '1.5',
  letter_spacing: 'normal',
  theme_mode: 'dark'
};
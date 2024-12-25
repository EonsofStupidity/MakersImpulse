import { ThemeMode, TransitionType, ThemeInheritanceStrategy, ComponentType, GlassEffectLevel, Json } from './base';

export interface ThemeBase {
  id?: string;
  colors?: {
    primary: string;
    secondary: string;
    accent: string;
    text: {
      primary: string;
      secondary: string;
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
    spacingUnit: string;
    transitionDuration: string;
    shadowColor: string;
    hoverScale: string;
    boxShadow: string;
    backdropBlur: string;
  };
  spacing?: {
    unit: string;
    scale: Record<string, string>;
  };
  animations?: {
    enabled: boolean;
    duration: number;
    type: TransitionType;
  };
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
}
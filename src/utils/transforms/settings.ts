import { ThemeBase, TransitionType } from '@/types/theme/core/types';
import { Json } from '@/types/database/json';

export const transformDatabaseSettings = (data: Json): ThemeBase => {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw new Error('Invalid settings data');
  }

  const typedData = data as Record<string, Json>;

  const inherited_settings: Record<string, Json> = {};
  if (typedData.inherited_settings && typeof typedData.inherited_settings === 'object') {
    Object.entries(typedData.inherited_settings as Record<string, Json>).forEach(([key, value]) => {
      inherited_settings[key] = value;
    });
  }

  const preview_preferences = typeof typedData.preview_preferences === 'string' 
    ? JSON.parse(typedData.preview_preferences)
    : typedData.preview_preferences || {
        real_time_updates: true,
        animation_enabled: true,
        glass_effect_level: 'medium',
        update_debounce_ms: 100
      };

  const theme_mode = (typedData.theme_mode as string) || 'light';
  if (!['light', 'dark', 'system'].includes(theme_mode)) {
    throw new Error('Invalid theme mode');
  }

  const inheritance_strategy = (typedData.inheritance_strategy as string) || 'merge';
  if (!['merge', 'override', 'replace'].includes(inheritance_strategy)) {
    throw new Error('Invalid inheritance strategy');
  }

  return {
    site_title: typedData.site_title as string || 'Default Title',
    primary_color: typedData.primary_color as string || '#000000',
    secondary_color: typedData.secondary_color as string || '#000000',
    accent_color: typedData.accent_color as string || '#000000',
    text_primary_color: typedData.text_primary_color as string || '#000000',
    text_secondary_color: typedData.text_secondary_color as string || '#000000',
    text_link_color: typedData.text_link_color as string || '#000000',
    text_heading_color: typedData.text_heading_color as string || '#000000',
    font_family_heading: typedData.font_family_heading as string || 'sans-serif',
    font_family_body: typedData.font_family_body as string || 'sans-serif',
    font_size_base: typedData.font_size_base as string || '16px',
    font_weight_normal: typedData.font_weight_normal as string || '400',
    font_weight_bold: typedData.font_weight_bold as string || '700',
    line_height_base: typedData.line_height_base as string || '1.5',
    letter_spacing: typedData.letter_spacing as string || 'normal',
    border_radius: typedData.border_radius as string || '0',
    spacing_unit: typedData.spacing_unit as string || '1rem',
    transition_duration: typedData.transition_duration as string || '0.3s',
    shadow_color: typedData.shadow_color as string || '#000000',
    hover_scale: typedData.hover_scale as string || '1',
    box_shadow: typedData.box_shadow as string || 'none',
    backdrop_blur: typedData.backdrop_blur as string || '0',
    neon_cyan: typedData.neon_cyan as string || '#00ffff',
    neon_pink: typedData.neon_pink as string || '#ff00ff',
    neon_purple: typedData.neon_purple as string || '#800080',
    theme_mode,
    transition_type: (typedData.transition_type as TransitionType) || 'fade',
    real_time_toggle: Boolean(typedData.real_time_toggle),
    animations_enabled: Boolean(typedData.animations_enabled),
    default_animation_duration: Number(typedData.default_animation_duration) || 300,
    preview_preferences,
    inheritance_strategy,
    inherited_settings,
    ...typedData
  } as ThemeBase;
};
import { Settings } from '@/types';

export const transformSettingsToStyles = (settings: Settings) => {
  return {
    '--primary-color': settings.primary_color,
    '--secondary-color': settings.secondary_color,
    '--accent-color': settings.accent_color,
    '--text-primary-color': settings.text_primary_color,
    '--text-secondary-color': settings.text_secondary_color,
    '--text-link-color': settings.text_link_color,
    '--text-heading-color': settings.text_heading_color,
    '--neon-cyan': settings.neon_cyan,
    '--neon-pink': settings.neon_pink,
    '--neon-purple': settings.neon_purple,
    '--font-family-heading': settings.font_family_heading,
    '--font-family-body': settings.font_family_body,
    '--font-size-base': settings.font_size_base,
    '--font-weight-normal': settings.font_weight_normal,
    '--font-weight-bold': settings.font_weight_bold,
    '--line-height-base': settings.line_height_base,
    '--letter-spacing': settings.letter_spacing,
    '--border-radius': settings.border_radius,
    '--spacing-unit': settings.spacing_unit,
    '--transition-duration': settings.transition_duration,
    '--shadow-color': settings.shadow_color,
    '--hover-scale': settings.hover_scale,
    '--box-shadow': settings.box_shadow,
    '--backdrop-blur': settings.backdrop_blur,
  };
};

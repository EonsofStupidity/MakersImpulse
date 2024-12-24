import { ThemeBase } from '@/types/theme/core/types';

export const applyThemeToDocument = (theme: ThemeBase): void => {
  const root = document.documentElement;
  
  root.style.setProperty('--primary-color', theme.primary_color);
  root.style.setProperty('--secondary-color', theme.secondary_color);
  root.style.setProperty('--accent-color', theme.accent_color);
  root.style.setProperty('--text-primary', theme.text_primary_color);
  root.style.setProperty('--text-secondary', theme.text_secondary_color);
  root.style.setProperty('--text-link', theme.text_link_color);
  root.style.setProperty('--text-heading', theme.text_heading_color);
  root.style.setProperty('--neon-cyan', theme.neon_cyan);
  root.style.setProperty('--neon-pink', theme.neon_pink);
  root.style.setProperty('--neon-purple', theme.neon_purple);
  root.style.setProperty('--font-family-heading', theme.font_family_heading);
  root.style.setProperty('--font-family-body', theme.font_family_body);
  root.style.setProperty('--font-size-base', theme.font_size_base);
  root.style.setProperty('--font-weight-normal', theme.font_weight_normal);
  root.style.setProperty('--font-weight-bold', theme.font_weight_bold);
  root.style.setProperty('--line-height-base', theme.line_height_base);
  root.style.setProperty('--letter-spacing', theme.letter_spacing);
  root.style.setProperty('--border-radius', theme.border_radius);
  root.style.setProperty('--spacing-unit', theme.spacing_unit);
  root.style.setProperty('--transition-duration', theme.transition_duration);
  root.style.setProperty('--shadow-color', theme.shadow_color);
  root.style.setProperty('--hover-scale', theme.hover_scale);
  root.style.setProperty('--box-shadow', theme.box_shadow);
  root.style.setProperty('--backdrop-blur', theme.backdrop_blur);
};
import { Settings } from "@/components/admin/settings/types";

export const applyThemeToDocument = (settings: Settings) => {
  console.log("Applying theme to document:", settings);
  const root = document.documentElement;
  
  // Apply colors
  root.style.setProperty('--primary', settings.primary_color);
  root.style.setProperty('--secondary', settings.secondary_color);
  root.style.setProperty('--accent', settings.accent_color);
  root.style.setProperty('--text-primary', settings.text_primary_color);
  root.style.setProperty('--text-secondary', settings.text_secondary_color);
  root.style.setProperty('--text-link', settings.text_link_color);
  root.style.setProperty('--text-heading', settings.text_heading_color);
  root.style.setProperty('--neon-cyan', settings.neon_cyan);
  root.style.setProperty('--neon-pink', settings.neon_pink);
  root.style.setProperty('--neon-purple', settings.neon_purple);

  // Apply spacing and layout
  root.style.setProperty('--border-radius', settings.border_radius);
  root.style.setProperty('--spacing-unit', settings.spacing_unit);
  root.style.setProperty('--transition-duration', settings.transition_duration);
  root.style.setProperty('--shadow-color', settings.shadow_color);
  root.style.setProperty('--hover-scale', settings.hover_scale);

  // Apply typography
  document.body.style.fontFamily = settings.font_family_body;
  root.style.setProperty('--font-heading', settings.font_family_heading);
  root.style.setProperty('--font-size-base', settings.font_size_base);
  root.style.setProperty('--font-weight-normal', settings.font_weight_normal);
  root.style.setProperty('--font-weight-bold', settings.font_weight_bold);
  root.style.setProperty('--line-height-base', settings.line_height_base);
  root.style.setProperty('--letter-spacing', settings.letter_spacing);

  console.log("Theme applied successfully");
};
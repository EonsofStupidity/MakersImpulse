import { Settings } from "@/components/admin/settings/types";
import { toast } from "sonner";

export const applyThemeToDocument = (settings: Settings) => {
  console.log("Applying theme to document:", settings);
  const root = document.documentElement;
  
  // Apply colors with visual feedback
  const applyColor = (property: string, value: string) => {
    root.style.setProperty(property, value);
    console.log(`Applied ${property}: ${value}`);
  };

  // Colors
  applyColor('--primary', settings.primary_color);
  applyColor('--secondary', settings.secondary_color);
  applyColor('--accent', settings.accent_color);
  applyColor('--text-primary', settings.text_primary_color);
  applyColor('--text-secondary', settings.text_secondary_color);
  applyColor('--text-link', settings.text_link_color);
  applyColor('--text-heading', settings.text_heading_color);
  applyColor('--neon-cyan', settings.neon_cyan);
  applyColor('--neon-pink', settings.neon_pink);
  applyColor('--neon-purple', settings.neon_purple);

  // Layout
  root.style.setProperty('--border-radius', settings.border_radius);
  root.style.setProperty('--spacing-unit', settings.spacing_unit);
  root.style.setProperty('--transition-duration', settings.transition_duration);
  root.style.setProperty('--shadow-color', settings.shadow_color);
  root.style.setProperty('--hover-scale', settings.hover_scale);

  // Typography
  document.body.style.fontFamily = settings.font_family_body;
  root.style.setProperty('--font-heading', settings.font_family_heading);
  root.style.setProperty('--font-size-base', settings.font_size_base);
  root.style.setProperty('--font-weight-normal', settings.font_weight_normal);
  root.style.setProperty('--font-weight-bold', settings.font_weight_bold);
  root.style.setProperty('--line-height-base', settings.line_height_base);
  root.style.setProperty('--letter-spacing', settings.letter_spacing);

  // Show confirmation toast with details
  toast.success("Theme updated", {
    description: "All visual settings have been applied to the website",
  });

  console.log("Theme applied successfully");
};
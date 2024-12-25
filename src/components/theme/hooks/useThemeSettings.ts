import { ThemeBase } from '@/types';
import { useSettings } from '@/hooks/useSettings';
import { toast } from 'sonner';
import { useEffect } from 'react';

export const useThemeSettings = () => {
  const { settings, updateSettings } = useSettings<ThemeBase>();
  
  useEffect(() => {
    if (settings) {
      // Apply theme settings to the document
      applyThemeToDocument(settings);
    }
  }, [settings]);

  const handleUpdateSettings = async (newSettings: Partial<ThemeBase>) => {
    try {
      await updateSettings(newSettings);
      toast.success('Theme settings updated successfully');
    } catch (error) {
      console.error('Error updating theme settings:', error);
      toast.error('Failed to update theme settings');
    }
  };

  return {
    settings,
    handleUpdateSettings,
  };
};

const applyThemeToDocument = (theme: ThemeBase) => {
  document.documentElement.style.setProperty('--primary-color', theme.primary_color);
  document.documentElement.style.setProperty('--secondary-color', theme.secondary_color);
  document.documentElement.style.setProperty('--accent-color', theme.accent_color);
  document.documentElement.style.setProperty('--text-primary-color', theme.text_primary_color);
  document.documentElement.style.setProperty('--text-secondary-color', theme.text_secondary_color);
  document.documentElement.style.setProperty('--text-link-color', theme.text_link_color);
  document.documentElement.style.setProperty('--text-heading-color', theme.text_heading_color);
  document.documentElement.style.setProperty('--neon-cyan', theme.neon_cyan);
  document.documentElement.style.setProperty('--neon-pink', theme.neon_pink);
  document.documentElement.style.setProperty('--neon-purple', theme.neon_purple);
  document.documentElement.style.setProperty('--font-family-heading', theme.font_family_heading);
  document.documentElement.style.setProperty('--font-family-body', theme.font_family_body);
  document.documentElement.style.setProperty('--font-size-base', theme.font_size_base);
  document.documentElement.style.setProperty('--font-weight-normal', theme.font_weight_normal);
  document.documentElement.style.setProperty('--font-weight-bold', theme.font_weight_bold);
  document.documentElement.style.setProperty('--line-height-base', theme.line_height_base);
  document.documentElement.style.setProperty('--letter-spacing', theme.letter_spacing);
  document.documentElement.style.setProperty('--border-radius', theme.border_radius);
  document.documentElement.style.setProperty('--spacing-unit', theme.spacing_unit);
  document.documentElement.style.setProperty('--transition-duration', theme.transition_duration);
  document.documentElement.style.setProperty('--shadow-color', theme.shadow_color);
  document.documentElement.style.setProperty('--hover-scale', theme.hover_scale);
  document.documentElement.style.setProperty('--box-shadow', theme.box_shadow);
  document.documentElement.style.setProperty('--backdrop-blur', theme.backdrop_blur);
};

import { ThemeBase } from '@/types/theme/core/types';
import { Json } from '@/types/core/json';

export const transformDatabaseToTheme = (data: Json): ThemeBase => {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw new Error('Invalid theme data');
  }

  return {
    colors: {
      primary: data.primary_color as string || '#7FFFD4',
      secondary: data.secondary_color as string || '#FFB6C1',
      accent: data.accent_color as string || '#E6E6FA',
      text: {
        primary: data.text_primary_color as string || '#FFFFFF',
        secondary: data.text_secondary_color as string || '#A1A1AA',
        link: data.text_link_color as string || '#3B82F6',
        heading: data.text_heading_color as string || '#FFFFFF'
      },
      neon: {
        cyan: data.neon_cyan as string || '#41f0db',
        pink: data.neon_pink as string || '#ff0abe',
        purple: data.neon_purple as string || '#8000ff'
      }
    },
    typography: {
      fontFamily: {
        heading: data.font_family_heading as string || 'Inter',
        body: data.font_family_body as string || 'Inter'
      },
      fontSize: data.font_size_base as string || '16px',
      fontWeight: {
        normal: data.font_weight_normal as string || '400',
        bold: data.font_weight_bold as string || '700'
      },
      lineHeight: data.line_height_base as string || '1.5',
      letterSpacing: data.letter_spacing as string || 'normal'
    },
    spacing: {
      borderRadius: data.border_radius as string || '0.5rem',
      unit: data.spacing_unit as string || '1rem'
    },
    effects: {
      transition: {
        duration: data.transition_duration as string || '0.3s',
        type: (data.transition_type as ThemeBase['effects']['transition']['type']) || 'fade'
      },
      shadow: {
        color: data.shadow_color as string || '#000000',
        boxShadow: data.box_shadow as string || 'none'
      },
      hover: {
        scale: data.hover_scale as string || '1.05'
      },
      backdrop: {
        blur: data.backdrop_blur as string || '0'
      }
    },
    mode: (data.theme_mode as ThemeBase['mode']) || 'light',
    animations: {
      enabled: Boolean(data.animations_enabled),
      defaultDuration: Number(data.default_animation_duration) || 300
    },
    preview: {
      real_time_updates: true,
      animation_enabled: true,
      glass_effect_level: 'medium',
      update_debounce_ms: 100,
      ...(data.preview_preferences as Json || {})
    },
    inheritance: {
      strategy: (data.inheritance_strategy as ThemeBase['inheritance']['strategy']) || 'merge',
      settings: (data.inherited_settings as Record<string, any>) || {}
    }
  };
};

export const applyThemeToDocument = (theme: ThemeBase): void => {
  const root = document.documentElement;
  
  // Colors
  root.style.setProperty('--primary', theme.colors.primary);
  root.style.setProperty('--secondary', theme.colors.secondary);
  root.style.setProperty('--accent', theme.colors.accent);
  root.style.setProperty('--text-primary', theme.colors.text.primary);
  root.style.setProperty('--text-secondary', theme.colors.text.secondary);
  root.style.setProperty('--text-link', theme.colors.text.link);
  root.style.setProperty('--text-heading', theme.colors.text.heading);
  root.style.setProperty('--neon-cyan', theme.colors.neon.cyan);
  root.style.setProperty('--neon-pink', theme.colors.neon.pink);
  root.style.setProperty('--neon-purple', theme.colors.neon.purple);

  // Typography
  root.style.setProperty('--font-family-heading', theme.typography.fontFamily.heading);
  root.style.setProperty('--font-family-body', theme.typography.fontFamily.body);
  root.style.setProperty('--font-size-base', theme.typography.fontSize);
  root.style.setProperty('--font-weight-normal', theme.typography.fontWeight.normal);
  root.style.setProperty('--font-weight-bold', theme.typography.fontWeight.bold);
  root.style.setProperty('--line-height-base', theme.typography.lineHeight);
  root.style.setProperty('--letter-spacing', theme.typography.letterSpacing);

  // Spacing
  root.style.setProperty('--border-radius', theme.spacing.borderRadius);
  root.style.setProperty('--spacing-unit', theme.spacing.unit);

  // Effects
  root.style.setProperty('--transition-duration', theme.effects.transition.duration);
  root.style.setProperty('--shadow-color', theme.effects.shadow.color);
  root.style.setProperty('--box-shadow', theme.effects.shadow.boxShadow);
  root.style.setProperty('--hover-scale', theme.effects.hover.scale);
  root.style.setProperty('--backdrop-blur', theme.effects.backdrop.blur);
};
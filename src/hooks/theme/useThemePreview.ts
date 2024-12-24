import { useCallback } from 'react';
import { ThemeBase } from '@/types/theme';

export const useThemePreview = () => {
  const getColor = useCallback((key: string, colors: Partial<ThemeBase>) => {
    if (colors.colors) {
      // New nested structure
      switch (key) {
        case 'primary': return colors.colors.primary;
        case 'secondary': return colors.colors.secondary;
        case 'accent': return colors.colors.accent;
        case 'text_primary': return colors.colors.text?.primary;
        case 'text_secondary': return colors.colors.text?.secondary;
        case 'text_heading': return colors.colors.text?.heading;
        case 'neon_cyan': return colors.colors.neon?.cyan;
        case 'neon_pink': return colors.colors.neon?.pink;
        case 'neon_purple': return colors.colors.neon?.purple;
        default: return undefined;
      }
    } else {
      // Legacy flat structure
      switch (key) {
        case 'primary': return (colors as any).primary_color;
        case 'secondary': return (colors as any).secondary_color;
        case 'accent': return (colors as any).accent_color;
        case 'text_primary': return (colors as any).text_primary_color;
        case 'text_secondary': return (colors as any).text_secondary_color;
        case 'text_heading': return (colors as any).text_heading_color;
        case 'neon_cyan': return (colors as any).neon_cyan;
        case 'neon_pink': return (colors as any).neon_pink;
        case 'neon_purple': return (colors as any).neon_purple;
        default: return undefined;
      }
    }
  }, []);

  return {
    getColor
  };
};
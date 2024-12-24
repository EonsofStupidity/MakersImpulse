import { useCallback } from 'react';
import { ThemeBase } from '@/types/theme';

export const useThemeTypography = () => {
  const getTypographyStyles = useCallback((theme: Partial<ThemeBase>) => {
    return {
      fontFamily: theme.typography?.fontFamily?.body,
      fontSize: theme.typography?.fontSize,
      lineHeight: theme.typography?.lineHeight,
      letterSpacing: theme.typography?.letterSpacing,
      headingFont: theme.typography?.fontFamily?.heading,
      fontWeightBold: theme.typography?.fontWeight?.bold,
    };
  }, []);

  return {
    getTypographyStyles
  };
};
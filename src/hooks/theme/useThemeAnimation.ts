import { useCallback } from 'react';
import { ThemeBase } from '@/types/theme';

export const useThemeAnimation = () => {
  const getAnimationConfig = useCallback((theme: Partial<ThemeBase>) => {
    return {
      enabled: theme.animations?.enabled ?? true,
      duration: theme.animations?.defaultDuration ? theme.animations.defaultDuration / 1000 : 0.3,
      hoverScale: parseFloat(theme.effects?.hover?.scale || '1.05'),
      backdropBlur: theme.effects?.backdrop?.blur || '0px',
      boxShadow: theme.effects?.shadow?.boxShadow
    };
  }, []);

  return {
    getAnimationConfig
  };
};
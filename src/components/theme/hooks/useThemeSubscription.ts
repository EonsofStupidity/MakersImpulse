import { ThemeBase } from '@/types';
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useThemeSubscription = (onThemeChange: (theme: ThemeBase) => void) => {
  useEffect(() => {
    const subscription = supabase
      .from('theme_configuration')
      .on('UPDATE', (payload) => {
        const updatedTheme = payload.new as ThemeBase;
        onThemeChange(updatedTheme);
      })
      .subscribe();

    return () => {
      supabase.removeSubscription(subscription);
    };
  }, [onThemeChange]);
};

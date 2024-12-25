import { ThemeBase } from '@/types';
import { supabase } from '@/integrations/supabase/client';
import { useEffect } from 'react';

export const useThemeSubscription = (onThemeChange: (theme: ThemeBase) => void) => {
  useEffect(() => {
    const channel = supabase.channel('theme_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'theme_configuration'
        },
        (payload) => {
          const updatedTheme = payload.new as unknown as ThemeBase;
          onThemeChange(updatedTheme);
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [onThemeChange]);
};
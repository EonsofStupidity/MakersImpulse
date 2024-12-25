import { ThemeBase } from '@/types';
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useThemeSubscription = (onThemeChange: (theme: ThemeBase) => void) => {
  useEffect(() => {
    const channel = supabase.channel('theme_changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'theme_configuration'
        },
        (payload) => {
          onThemeChange(payload.new as ThemeBase);
        }
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [onThemeChange]);
};
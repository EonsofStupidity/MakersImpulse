import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ThemeBase } from '@/types';

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
          onThemeChange(payload.new as ThemeBase);
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [onThemeChange]);
};
import { ThemeBase } from '@/types';
import { supabase } from '@/integrations/supabase/client';
import { useEffect } from 'react';

export const useThemeSubscription = (setTheme: (theme: ThemeBase) => void) => {
  useEffect(() => {
    const channel = supabase.channel('theme_changes')
      .on('postgres_changes', { 
        event: 'UPDATE', 
        schema: 'public', 
        table: 'theme_configuration' 
      }, (payload) => {
        setTheme(payload.new as unknown as ThemeBase);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [setTheme]);
};
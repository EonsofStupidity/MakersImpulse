import { ThemeBase } from '@/types';
import { supabase } from '@/integrations/supabase/client';
import { useEffect } from 'react';

export const useThemeSubscription = (setTheme: (theme: ThemeBase) => void) => {
  useEffect(() => {
    const subscription = supabase
      .from('theme_configuration')
      .on('UPDATE', (payload) => {
        setTheme(payload.new as unknown as ThemeBase);
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [setTheme]);
};
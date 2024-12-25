import { ThemeBase } from '@/types';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useThemeSetup = () => {
  const [theme, setTheme] = useState<ThemeBase | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const { data, error } = await supabase
          .from('theme_configuration')
          .select('*')
          .single();

        if (error) throw error;

        setTheme(data as unknown as ThemeBase);
      } catch (error) {
        console.error('Error fetching theme:', error);
        toast.error('Failed to load theme');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTheme();
  }, []);

  return { theme, setTheme, isLoading };
};
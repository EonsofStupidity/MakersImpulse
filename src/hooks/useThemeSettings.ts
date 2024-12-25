import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ThemeBase } from '@/types';
import { toast } from 'sonner';

export const useThemeSettings = (themeId: string) => {
  const [theme, setTheme] = useState<ThemeBase | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTheme = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, error: fetchError } = await supabase
          .from('theme_configuration')
          .select('*')
          .eq('id', themeId)
          .single();

        if (fetchError) throw fetchError;

        setTheme(data as ThemeBase);
      } catch (err) {
        console.error('Error fetching theme:', err);
        setError('Failed to load theme settings');
        toast.error('Failed to load theme settings');
      } finally {
        setLoading(false);
      }
    };

    if (themeId) {
      fetchTheme();
    }
  }, [themeId]);

  return { theme, loading, error };
};
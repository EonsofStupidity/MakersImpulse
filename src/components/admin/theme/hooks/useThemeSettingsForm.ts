import { ThemeBase, Settings } from '@/types';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useThemeSettingsForm = (themeId: string) => {
  const [themeSettings, setThemeSettings] = useState<ThemeBase | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchThemeSettings = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from('themes')
          .select('*')
          .eq('id', themeId)
          .single();

        if (error) throw error;

        setThemeSettings(data);
      } catch (error) {
        console.error('Error fetching theme settings:', error);
        setError('Failed to load theme settings');
        toast.error('Failed to load theme settings');
      } finally {
        setLoading(false);
      }
    };

    fetchThemeSettings();
  }, [themeId]);

  return { themeSettings, loading, error };
};

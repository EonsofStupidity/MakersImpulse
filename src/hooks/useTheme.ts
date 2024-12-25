import { useCallback, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ThemeBase } from '@/types/theme/core/types';
import { applyThemeToDocument } from '@/utils/transforms/theme';

export const useTheme = () => {
  const [theme, setTheme] = useState<ThemeBase | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchTheme = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('theme_configuration')
        .select('*')
        .single();

      if (error) throw error;

      const themeData = data as ThemeBase;
      setTheme(themeData);
      applyThemeToDocument(themeData);
      console.log('Theme loaded:', themeData);
    } catch (error) {
      console.error('Error fetching theme:', error);
      toast.error('Failed to load theme');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateTheme = useCallback(async (updates: Partial<ThemeBase>) => {
    try {
      setIsUpdating(true);
      const { data, error } = await supabase
        .from('theme_configuration')
        .update(updates)
        .eq('id', theme?.id)
        .select()
        .single();

      if (error) throw error;

      const updatedTheme = data as ThemeBase;
      setTheme(updatedTheme);
      applyThemeToDocument(updatedTheme);
      toast.success('Theme updated successfully');
    } catch (error) {
      console.error('Error updating theme:', error);
      toast.error('Failed to update theme');
    } finally {
      setIsUpdating(false);
    }
  }, [theme?.id]);

  return {
    theme,
    isLoading,
    isUpdating,
    fetchTheme,
    updateTheme
  };
};

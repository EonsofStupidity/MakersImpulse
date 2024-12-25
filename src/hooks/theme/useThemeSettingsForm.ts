import { ThemeBase } from '@/types';
import { useSettings } from '@/hooks/useSettings';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';

export const useThemeSettingsForm = () => {
  const { settings, updateSettings } = useSettings();
  const [theme, setTheme] = useState<ThemeBase | null>(null);

  useEffect(() => {
    if (settings) {
      setTheme(settings as ThemeBase);
    }
  }, [settings]);

  const handleUpdate = async (updatedTheme: Partial<ThemeBase>) => {
    try {
      await updateSettings({ ...theme, ...updatedTheme });
      toast.success('Theme settings updated successfully');
    } catch (error) {
      console.error('Error updating theme settings:', error);
      toast.error('Failed to update theme settings');
    }
  };

  return {
    theme,
    handleUpdate,
  };
};

import { useCallback, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ApplicationSettings } from '@/types/settings/core/types';

export const useSettings = () => {
  const [settings, setSettings] = useState<ApplicationSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchSettings = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('application_settings')
        .select('*')
        .single();

      if (error) throw error;

      setSettings(data);
      console.log('Settings loaded:', data);
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast.error('Failed to load application settings');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateSettings = useCallback(async (updates: Partial<ApplicationSettings>) => {
    try {
      setIsUpdating(true);
      const { data, error } = await supabase
        .from('application_settings')
        .update(updates)
        .eq('id', settings?.id)
        .select()
        .single();

      if (error) throw error;

      setSettings(data);
      toast.success('Settings updated successfully');
    } catch (error) {
      console.error('Error updating settings:', error);
      toast.error('Failed to update settings');
    } finally {
      setIsUpdating(false);
    }
  }, [settings?.id]);

  return {
    settings,
    isLoading,
    isUpdating,
    fetchSettings,
    updateSettings
  };
};
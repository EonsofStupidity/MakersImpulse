import { Settings, SettingsFormData } from '@/types';
import { useQuery, useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useSettings = () => {
  const fetchSettings = async () => {
    const { data, error } = await supabase.from('settings').select('*');
    if (error) throw error;
    return data;
  };

  const { data: settings, error: fetchError } = useQuery(['settings'], fetchSettings);

  const updateSettings = async (settingsData: SettingsFormData) => {
    const { error } = await supabase
      .from('settings')
      .update(settingsData)
      .eq('id', settingsData.id);
    if (error) throw error;
    toast.success('Settings updated successfully');
  };

  const { mutate: updateSettingsMutate } = useMutation(updateSettings, {
    onError: (error) => {
      console.error('Error updating settings:', error);
      toast.error('Failed to update settings');
    },
  });

  return {
    settings,
    fetchError,
    updateSettings: updateSettingsMutate,
  };
};

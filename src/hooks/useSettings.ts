import { UseQueryOptions, useQuery, useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ThemeBase } from '@/types';

export const useSettings = () => {
  const fetchSettings = async () => {
    const { data, error } = await supabase
      .from('unified_settings')
      .select('*')
      .single();
    if (error) throw error;
    return data;
  };

  const { data: settings, error: fetchError } = useQuery({
    queryKey: ['settings'],
    queryFn: fetchSettings
  });

  const updateSettings = async (settingsData: ThemeBase) => {
    const { error } = await supabase
      .from('unified_settings')
      .update(settingsData)
      .eq('id', settingsData.id);
    if (error) throw error;
  };

  const { mutate: updateSettingsMutate } = useMutation({
    mutationFn: updateSettings,
    onError: (error) => {
      console.error('Error updating settings:', error);
    }
  });

  return {
    settings,
    fetchError,
    updateSettings: updateSettingsMutate,
  };
};
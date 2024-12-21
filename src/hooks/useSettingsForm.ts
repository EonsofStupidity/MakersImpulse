import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { SettingsFormData } from "@/types/theme/core/form";
import { DEFAULT_THEME_SETTINGS } from "@/components/theme/utils/themeUtils";
import { useThemeInheritance } from '@/hooks/useThemeInheritance';

export const useSettingsForm = () => {
  const [settings, setSettings] = useState<SettingsFormData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);

  const { mergeThemes } = useThemeInheritance(settings?.parent_theme_id, settings?.inheritance_strategy);

  const handleSettingsUpdate = async (newSettings: SettingsFormData) => {
    setIsSaving(true);
    try {
      const { data, error } = await supabase
        .from('theme_configuration')
        .update(newSettings)
        .eq('id', settings?.id)
        .select()
        .single();

      if (error) throw error;
      
      const mergedSettings = mergeThemes(data, null);
      setSettings(mergedSettings as SettingsFormData);
      toast.success("Settings updated successfully");
    } catch (error) {
      console.error("Error updating settings:", error);
      toast.error("Failed to update settings");
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogoUpload = (file: File) => setLogoFile(file);
  const handleFaviconUpload = (file: File) => setFaviconFile(file);
  
  const handleResetToDefault = async () => {
    try {
      await handleSettingsUpdate(DEFAULT_THEME_SETTINGS as SettingsFormData);
      toast.success("Settings reset to default");
    } catch (error) {
      console.error("Error resetting settings:", error);
      toast.error("Failed to reset settings");
    }
  };

  return {
    settings,
    isLoading,
    isSaving,
    logoFile,
    faviconFile,
    handleLogoUpload,
    handleFaviconUpload,
    handleSettingsUpdate,
    handleResetToDefault,
  };
};
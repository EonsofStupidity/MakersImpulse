import { useState } from "react";
import { useSettings } from "@/hooks/useSettings";
import { ThemeBase } from "@/types";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const useSettingsForm = () => {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);
  
  const { data: themeSettings, isLoading, mutate: updateSetting, isUpdating } = useSettings();

  const handleSettingsUpdate = async (settings: Partial<ThemeBase>) => {
    try {
      const updatedSettings = {
        ...themeSettings,
        ...settings
      } as ThemeBase;
      
      await updateSetting(updatedSettings);
      toast.success("Theme settings updated");
    } catch (error) {
      console.error("Error updating settings:", error);
      toast.error("Failed to update theme settings");
    }
  };

  const handleResetToDefault = async () => {
    try {
      const defaultSettings: Partial<ThemeBase> = {
        theme_mode: 'light',
        preview_preferences: {
          real_time_updates: true,
          animation_enabled: true,
          glass_effect_level: 'medium',
          update_debounce_ms: 100
        }
      };

      await updateSetting(defaultSettings as ThemeBase);
      toast.success("Theme reset to defaults");
    } catch (error) {
      console.error("Error resetting theme:", error);
      toast.error("Failed to reset theme");
    }
  };

  const handleLogoUpload = (file: File) => setLogoFile(file);
  const handleFaviconUpload = (file: File) => setFaviconFile(file);

  return {
    settings: themeSettings as ThemeBase,
    isLoading,
    isSaving: isUpdating,
    logoFile,
    faviconFile,
    handleLogoUpload,
    handleFaviconUpload,
    handleSettingsUpdate,
    handleResetToDefault,
  };
};
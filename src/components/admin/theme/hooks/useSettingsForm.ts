import { useState } from "react";
import { useSettings } from "@/hooks/useSettings";
import { ThemeBase } from "@/types/theme";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const useSettingsForm = () => {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);
  
  const { setting: themeSettings, isLoading, updateSetting, isUpdating } = useSettings<ThemeBase & Record<string, any>>("theme", "base");

  const handleSettingsUpdate = async (settings: Partial<ThemeBase>) => {
    try {
      const updatedSettings = {
        ...themeSettings?.value,
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
      const { error } = await supabase
        .from("theme_configuration")
        .update({
          theme_mode: 'light',
          preview_preferences: {
            real_time_updates: true,
            animation_enabled: true,
            glass_effect_level: 'medium',
            update_debounce_ms: 100
          }
        })
        .eq('id', themeSettings?.id);

      if (error) throw error;
      toast.success("Theme reset to defaults");
    } catch (error) {
      console.error("Error resetting theme:", error);
      toast.error("Failed to reset theme");
    }
  };

  const handleLogoUpload = (file: File) => setLogoFile(file);
  const handleFaviconUpload = (file: File) => setFaviconFile(file);

  return {
    settings: themeSettings?.value as ThemeBase,
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
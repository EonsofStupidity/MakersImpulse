import { useState } from "react";
import { useSettings } from "@/hooks/useSettings";
import { ThemeBase } from "@/types";
import { toast } from "sonner";

export const useThemeSettingsForm = () => {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);
  
  const { settings, isLoading, updateSettings, isUpdating } = useSettings();

  const handleSettingsUpdate = async (settings: Partial<ThemeBase>) => {
    try {
      await updateSettings(settings);
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

      await updateSettings(defaultSettings as ThemeBase);
      toast.success("Theme reset to defaults");
    } catch (error) {
      console.error("Error resetting theme:", error);
      toast.error("Failed to reset theme");
    }
  };

  const handleLogoUpload = (file: File) => setLogoFile(file);
  const handleFaviconUpload = (file: File) => setFaviconFile(file);

  return {
    settings: settings as ThemeBase,
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
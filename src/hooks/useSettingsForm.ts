import { useState } from "react";
import { useSettings } from "@/hooks/useSettings";
import { ThemeBase } from "@/types/theme/core/types";
import { transformDatabaseSettings } from "@/utils/transforms/settings";
import { Json } from "@/types/database/json";

export const useSettingsForm = () => {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);
  
  const { setting: themeSettings, isLoading, updateSetting, isUpdating } = useSettings<ThemeBase>("theme", "base");

  const handleSettingsUpdate = async (settings: Partial<ThemeBase>) => {
    try {
      // Convert settings to the correct format before sending to Supabase
      const jsonSettings = JSON.parse(JSON.stringify(settings)) as Json;
      await updateSetting(jsonSettings);
    } catch (error) {
      console.error("Error updating settings:", error);
    }
  };

  const handleResetToDefault = async () => {
    console.log("Reset to default");
  };

  const handleLogoUpload = (file: File) => setLogoFile(file);
  const handleFaviconUpload = (file: File) => setFaviconFile(file);

  // Transform the raw settings data into our ThemeBase type
  const transformedSettings = themeSettings?.value ? 
    transformDatabaseSettings(themeSettings.value) : 
    undefined;

  return {
    settings: transformedSettings,
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
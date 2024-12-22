import { useState } from "react";
import { useSettings } from "@/hooks/useSettings";
import { ThemeBase } from "@/types/theme/types";

export const useSettingsForm = () => {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);
  
  const { setting: themeSettings, isLoading, updateSetting, isUpdating } = useSettings("theme", "base");

  const handleSettingsUpdate = async (settings: Partial<ThemeBase>) => {
    const jsonSettings = JSON.parse(JSON.stringify(settings));
    await updateSetting(jsonSettings);
  };

  const handleResetToDefault = async () => {
    console.log("Reset to default");
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
import { useState } from "react";
import { useSettings } from "@/hooks/useSettings";
import { ThemeBase } from "@/types/theme/core/types";

export const useSettingsForm = () => {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);
  
  const { setting: themeSettings, isLoading, updateSetting, isUpdating } = useSettings("theme", "base");

  const handleSettingsUpdate = async (settings: Partial<ThemeBase>) => {
    await updateSetting(settings);
  };

  const handleResetToDefault = async () => {
    // Reset logic will be implemented here
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
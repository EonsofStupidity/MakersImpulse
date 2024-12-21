import { useState } from "react";
import { useThemeStore } from "@/lib/store/theme-store";

export const useSettingsForm = () => {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);
  
  const { 
    theme: settings,
    isLoading,
    updateTheme: handleSettingsUpdate,
    resetTheme: handleResetToDefault,
  } = useThemeStore();

  const handleLogoUpload = (file: File) => setLogoFile(file);
  const handleFaviconUpload = (file: File) => setFaviconFile(file);

  return {
    settings,
    isLoading,
    isSaving: false, // We'll handle loading states in the store
    logoFile,
    faviconFile,
    handleLogoUpload,
    handleFaviconUpload,
    handleSettingsUpdate,
    handleResetToDefault,
  };
};
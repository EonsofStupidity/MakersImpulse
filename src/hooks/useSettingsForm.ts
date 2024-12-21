import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ThemeFormData } from "@/types/theme/core/types";
import { DEFAULT_SETTINGS } from "./useSettingsDefaults";
import { useThemeInheritance } from "@/hooks/useThemeInheritance";

export const useSettingsForm = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);
  const queryClient = useQueryClient();

  const { data: settings, isLoading } = useQuery({
    queryKey: ["theme-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("theme_configuration")
        .select("*")
        .single();

      if (error) {
        console.error("Error fetching settings:", error);
        toast.error("Failed to load theme settings");
        throw error;
      }

      return data || DEFAULT_SETTINGS;
    }
  });

  const { parentTheme, mergeThemes } = useThemeInheritance(
    settings?.parent_theme_id,
    settings?.inheritance_strategy
  );

  const { mutateAsync: updateSettings } = useMutation({
    mutationFn: async (newSettings: Partial<ThemeFormData>) => {
      setIsSaving(true);
      const mergedSettings = mergeThemes(newSettings as ThemeFormData, parentTheme);
      
      const { data, error } = await supabase
        .from("theme_configuration")
        .update(mergedSettings)
        .eq('id', settings?.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["theme-settings"] });
      toast.success("Settings updated successfully");
    },
    onError: (error) => {
      console.error("Error updating settings:", error);
      toast.error("Failed to update settings");
    },
    onSettled: () => {
      setIsSaving(false);
    }
  });

  const handleLogoUpload = (file: File) => setLogoFile(file);
  const handleFaviconUpload = (file: File) => setFaviconFile(file);

  const handleResetToDefault = async () => {
    try {
      await updateSettings(DEFAULT_SETTINGS);
      toast.success("Settings reset to default");
    } catch (error) {
      console.error("Error resetting settings:", error);
      toast.error("Failed to reset settings");
    }
  };

  return {
    settings: settings ? mergeThemes(settings as ThemeFormData, parentTheme) : null,
    isLoading,
    isSaving,
    logoFile,
    faviconFile,
    handleLogoUpload,
    handleFaviconUpload,
    handleSettingsUpdate: updateSettings,
    handleResetToDefault,
  };
};
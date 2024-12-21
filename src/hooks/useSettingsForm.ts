import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ThemeBase, ThemeFormData } from "@/types/theme";
import { useThemeStore } from "@/lib/store/theme-store";

export const useSettingsForm = () => {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);
  const queryClient = useQueryClient();
  const { theme, updateTheme, resetTheme } = useThemeStore();

  const { isLoading } = useQuery({
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

      return data;
    }
  });

  const { mutate: handleSettingsUpdate, isPending: isSaving } = useMutation({
    mutationFn: async (newSettings: Partial<ThemeFormData>) => {
      await updateTheme(newSettings);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["theme-settings"] });
      toast.success("Settings updated successfully");
    },
    onError: (error) => {
      console.error("Error updating settings:", error);
      toast.error("Failed to update settings");
    }
  });

  const handleLogoUpload = (file: File) => setLogoFile(file);
  const handleFaviconUpload = (file: File) => setFaviconFile(file);

  return {
    settings: theme,
    isLoading,
    isSaving,
    logoFile,
    faviconFile,
    handleLogoUpload,
    handleFaviconUpload,
    handleSettingsUpdate,
    handleResetToDefault: resetTheme,
  };
};
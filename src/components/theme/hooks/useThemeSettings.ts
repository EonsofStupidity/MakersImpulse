import { useState, useCallback } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ThemeBase, ThemeConfigurationRow } from '@/types/theme/core/types';
import { convertDbSettingsToTheme, DEFAULT_THEME_SETTINGS } from "../utils/themeUtils";

export const useThemeSettings = () => {
  const [theme, setTheme] = useState<ThemeBase | null>(null);

  const fetchSettings = useCallback(async () => {
    try {
      const { data: rawData, error } = await supabase
        .from("theme_configuration")
        .select("*")
        .single();

      if (error) throw error;

      const themeData = convertDbSettingsToTheme(rawData as ThemeConfigurationRow);
      setTheme(themeData);
      toast.success("Theme settings loaded");
      
    } catch (error) {
      console.error("Error fetching theme settings:", error);
      setTheme(DEFAULT_THEME_SETTINGS);
      toast.error("Failed to load theme settings");
    }
  }, []);

  return { theme, setTheme, fetchSettings };
};
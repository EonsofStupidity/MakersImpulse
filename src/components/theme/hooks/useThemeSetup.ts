import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Settings } from "@/components/admin/settings/types";
import { toast } from "sonner";
import { DatabaseSettingsRow } from "../types/theme";
import { convertDbSettingsToTheme, DEFAULT_THEME_SETTINGS, applyThemeToDocument } from "../utils/themeUtils";

export const useThemeSetup = () => {
  const [theme, setTheme] = useState<Settings>(DEFAULT_THEME_SETTINGS);

  useEffect(() => {
    const fetchInitialTheme = async () => {
      try {
        console.log("Fetching initial theme settings...");
        const { data: rawData, error } = await supabase
          .from("site_settings")
          .select("*")
          .single();

        if (error) {
          if (error.code === 'PGRST116') {
            // If no settings exist, use defaults
            console.log("No settings found, using defaults");
            applyThemeToDocument(DEFAULT_THEME_SETTINGS);
            return;
          }
          throw error;
        }

        const dbSettings = rawData as DatabaseSettingsRow;
        const themeData = convertDbSettingsToTheme(dbSettings);

        console.log("Initial theme settings fetched:", themeData);
        setTheme(themeData);
        applyThemeToDocument(themeData);
        toast.success("Theme settings loaded");
      } catch (error) {
        console.error("Error fetching theme:", error);
        // Use defaults on error
        setTheme(DEFAULT_THEME_SETTINGS);
        applyThemeToDocument(DEFAULT_THEME_SETTINGS);
        toast.error("Failed to load theme settings, using defaults");
      }
    };

    fetchInitialTheme();
  }, []);

  return { theme, setTheme };
};
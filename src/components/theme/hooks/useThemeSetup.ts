import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ThemeBase } from "@/types/theme";
import { toast } from "sonner";
import { convertDbSettingsToTheme, DEFAULT_THEME_SETTINGS, applyThemeToDocument } from "../utils/themeUtils";

export const useThemeSetup = () => {
  const [theme, setTheme] = useState<ThemeBase>(DEFAULT_THEME_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInitialTheme = async () => {
      try {
        console.log("Fetching initial theme settings...");
        
        const { data: rawData, error } = await supabase
          .from("theme_configuration")
          .select("*")
          .limit(1)
          .maybeSingle();

        if (error) {
          console.error("Error fetching theme:", error);
          setTheme(DEFAULT_THEME_SETTINGS);
          applyThemeToDocument(DEFAULT_THEME_SETTINGS);
          setIsLoading(false);
          return;
        }

        if (!rawData) {
          console.log("No settings found, using defaults");
          setTheme(DEFAULT_THEME_SETTINGS);
          applyThemeToDocument(DEFAULT_THEME_SETTINGS);
          setIsLoading(false);
          return;
        }

        const themeData = convertDbSettingsToTheme(rawData);
        
        console.log("Initial theme settings fetched:", themeData);
        setTheme(themeData);
        applyThemeToDocument(themeData);
        toast.success("Theme settings loaded");
      } catch (error) {
        console.error("Error in theme setup:", error);
        setTheme(DEFAULT_THEME_SETTINGS);
        applyThemeToDocument(DEFAULT_THEME_SETTINGS);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialTheme();
  }, []);

  return { theme, setTheme, isLoading };
};

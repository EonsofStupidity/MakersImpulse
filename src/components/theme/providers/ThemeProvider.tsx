import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { convertDbSettingsToTheme, applyThemeToDocument } from "../utils/themeUtils";
import type { Theme } from "../types/theme";
import type { DatabaseSettingsRow } from "@/integrations/supabase/types";

const ThemeContext = createContext<Theme | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const fetchInitialSettings = async () => {
      console.log("Fetching initial theme settings...");
      try {
        const { data: rawData, error } = await supabase
          .from("site_settings")
          .select("*")
          .limit(1)
          .single();

        if (error) {
          if (error.code === 'PGRST116') {
            // If no settings exist, create default settings
            const { data: newSettings, error: insertError } = await supabase
              .from("site_settings")
              .insert([{
                site_title: 'MakersImpulse',
                primary_color: '#7FFFD4',
                secondary_color: '#FFB6C1',
                accent_color: '#E6E6FA',
                text_primary_color: '#FFFFFF',
                text_secondary_color: '#A1A1AA'
              }])
              .select()
              .single();

            if (insertError) throw insertError;
            
            const themeData = convertDbSettingsToTheme(newSettings as DatabaseSettingsRow);
            setTheme(themeData);
            applyThemeToDocument(themeData);
            return;
          }
          throw error;
        }

        const dbSettings = rawData as DatabaseSettingsRow;
        const themeData = convertDbSettingsToTheme(dbSettings);
        setTheme(themeData);
        applyThemeToDocument(themeData);
      } catch (error) {
        console.error("Error fetching theme:", error);
        toast.error("Failed to load theme settings");
      }
    };

    fetchInitialSettings();
  }, []);

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { convertDbSettingsToTheme, applyThemeToDocument, DEFAULT_THEME_SETTINGS } from "../utils/themeUtils";
import { Theme, ThemeContextType, DatabaseSettingsRow } from "../types/theme";

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const fetchInitialSettings = async () => {
      console.log("Fetching initial theme settings...");
      try {
        const { data: rawData, error } = await supabase
          .from("site_settings")
          .select("*")
          .maybeSingle();

        if (error) {
          console.error("Error fetching settings:", error);
          // Use defaults if there's an error
          const themeData = convertDbSettingsToTheme(null);
          setTheme(themeData);
          applyThemeToDocument(themeData);
          return;
        }

        if (!rawData) {
          console.log("No settings found, using defaults");
          const themeData = convertDbSettingsToTheme(null);
          setTheme(themeData);
          applyThemeToDocument(themeData);
          return;
        }

        const dbSettings = rawData as DatabaseSettingsRow;
        const themeData = convertDbSettingsToTheme(dbSettings);

        console.log("Initial theme settings fetched:", themeData);
        setTheme(themeData);
        applyThemeToDocument(themeData);
        toast.success("Theme settings loaded");
      } catch (error) {
        console.error("Error in fetchInitialSettings:", error);
        // Use defaults on error
        const themeData = convertDbSettingsToTheme(null);
        setTheme(themeData);
        applyThemeToDocument(themeData);
        toast.error("Failed to load theme settings, using defaults");
      }
    };

    fetchInitialSettings();
  }, []);

  const updateTheme = async (newTheme: Theme) => {
    try {
      const { error } = await supabase.rpc('update_site_settings', {
        p_site_title: newTheme.site_title,
        p_tagline: newTheme.tagline,
        p_primary_color: newTheme.primary_color,
        p_secondary_color: newTheme.secondary_color,
        p_accent_color: newTheme.accent_color,
        p_text_primary_color: newTheme.text_primary_color,
        p_text_secondary_color: newTheme.text_secondary_color,
        p_text_link_color: newTheme.text_link_color,
        p_text_heading_color: newTheme.text_heading_color,
        p_neon_cyan: newTheme.neon_cyan,
        p_neon_pink: newTheme.neon_pink,
        p_neon_purple: newTheme.neon_purple,
        p_border_radius: newTheme.border_radius,
        p_spacing_unit: newTheme.spacing_unit,
        p_transition_duration: newTheme.transition_duration,
        p_shadow_color: newTheme.shadow_color,
        p_hover_scale: newTheme.hover_scale,
        p_font_family_heading: newTheme.font_family_heading,
        p_font_family_body: newTheme.font_family_body,
        p_font_size_base: newTheme.font_size_base,
        p_font_weight_normal: newTheme.font_weight_normal,
        p_font_weight_bold: newTheme.font_weight_bold,
        p_line_height_base: newTheme.line_height_base,
        p_letter_spacing: newTheme.letter_spacing
      });

      if (error) throw error;
      setTheme(newTheme);
      applyThemeToDocument(newTheme);
      toast.success("Theme updated successfully");
    } catch (error) {
      console.error("Error updating theme:", error);
      toast.error("Failed to update theme");
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { convertDbSettingsToTheme, applyThemeToDocument } from "../utils/themeUtils";
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
                text_secondary_color: '#A1A1AA',
                text_link_color: '#3B82F6',
                text_heading_color: '#FFFFFF',
                neon_cyan: '#41f0db',
                neon_pink: '#ff0abe',
                neon_purple: '#8000ff',
                font_family_heading: 'Inter',
                font_family_body: 'Inter',
                font_size_base: '16px',
                font_weight_normal: '400',
                font_weight_bold: '700',
                line_height_base: '1.5',
                letter_spacing: 'normal',
                border_radius: '0.5rem',
                spacing_unit: '1rem',
                transition_duration: '0.3s',
                shadow_color: '#000000',
                hover_scale: '1.05'
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
        console.log("Initial theme settings fetched:", themeData);
        setTheme(themeData);
        applyThemeToDocument(themeData);
        toast.success("Theme settings loaded");
      } catch (error) {
        console.error("Error fetching theme:", error);
        toast.error("Failed to load theme settings");
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
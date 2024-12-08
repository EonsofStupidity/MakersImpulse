import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Settings } from "@/components/admin/settings/types";
import { toast } from "sonner";

interface ThemeContextType {
  theme: Settings | null;
  updateTheme: (newTheme: Settings) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Settings | null>(null);

  useEffect(() => {
    const fetchInitialTheme = async () => {
      try {
        const { data, error } = await supabase
          .from("site_settings")
          .select("*")
          .single();

        if (error) throw error;

        // Ensure all required properties are present with defaults
        const themeData: Settings = {
          ...data,
          neon_cyan: data.neon_cyan || "#41f0db",
          neon_pink: data.neon_pink || "#ff0abe",
          neon_purple: data.neon_purple || "#8000ff",
        };

        setTheme(themeData);
        applyThemeToDocument(themeData);
      } catch (error) {
        console.error("Error fetching theme:", error);
        toast.error("Failed to load theme settings");
      }
    };

    fetchInitialTheme();

    // Subscribe to real-time changes
    const channel = supabase
      .channel('site_settings_changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'site_settings'
        },
        (payload) => {
          const newSettings = payload.new as Settings;
          const themeData: Settings = {
            ...newSettings,
            neon_cyan: newSettings.neon_cyan || "#41f0db",
            neon_pink: newSettings.neon_pink || "#ff0abe",
            neon_purple: newSettings.neon_purple || "#8000ff",
          };
          setTheme(themeData);
          applyThemeToDocument(themeData);
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const applyThemeToDocument = (settings: Settings) => {
    const root = document.documentElement;
    
    // Apply colors
    root.style.setProperty('--primary', settings.primary_color);
    root.style.setProperty('--secondary', settings.secondary_color);
    root.style.setProperty('--accent', settings.accent_color);
    root.style.setProperty('--text-primary', settings.text_primary_color);
    root.style.setProperty('--text-secondary', settings.text_secondary_color);
    root.style.setProperty('--text-link', settings.text_link_color);
    root.style.setProperty('--text-heading', settings.text_heading_color);
    root.style.setProperty('--neon-cyan', settings.neon_cyan);
    root.style.setProperty('--neon-pink', settings.neon_pink);
    root.style.setProperty('--neon-purple', settings.neon_purple);

    // Apply spacing and layout
    root.style.setProperty('--border-radius', settings.border_radius);
    root.style.setProperty('--spacing-unit', settings.spacing_unit);
    root.style.setProperty('--transition-duration', settings.transition_duration);
    root.style.setProperty('--shadow-color', settings.shadow_color);
    root.style.setProperty('--hover-scale', settings.hover_scale);

    // Apply typography
    document.body.style.fontFamily = settings.font_family_body;
    root.style.setProperty('--font-heading', settings.font_family_heading);
    root.style.setProperty('--font-size-base', settings.font_size_base);
    root.style.setProperty('--font-weight-normal', settings.font_weight_normal);
    root.style.setProperty('--font-weight-bold', settings.font_weight_bold);
    root.style.setProperty('--line-height-base', settings.line_height_base);
    root.style.setProperty('--letter-spacing', settings.letter_spacing);

    console.log("Theme applied:", settings);
  };

  const updateTheme = async (newTheme: Settings) => {
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
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Settings } from "@/components/admin/settings/types";
import { toast } from "sonner";
import { applyThemeToDocument } from "../utils/themeUtils";
import { DEFAULT_SETTINGS } from "@/components/admin/settings/hooks/useSettingsDefaults";

interface ThemeContextType {
  theme: Settings | null;
  updateTheme: (newTheme: Settings) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Settings | null>(null);

  // Initial theme fetch
  useEffect(() => {
    const fetchInitialTheme = async () => {
      try {
        console.log("Fetching initial theme settings...");
        const { data, error } = await supabase
          .from("site_settings")
          .select("*")
          .single();

        if (error) throw error;

        // Convert database settings to Settings type with defaults
        const themeData: Settings = {
          site_title: data.site_title || DEFAULT_SETTINGS.site_title,
          tagline: data.tagline || DEFAULT_SETTINGS.tagline,
          primary_color: data.primary_color || DEFAULT_SETTINGS.primary_color,
          secondary_color: data.secondary_color || DEFAULT_SETTINGS.secondary_color,
          accent_color: data.accent_color || DEFAULT_SETTINGS.accent_color,
          logo_url: data.logo_url,
          favicon_url: data.favicon_url,
          theme_mode: data.theme_mode || 'system',
          text_primary_color: data.text_primary_color || DEFAULT_SETTINGS.text_primary_color,
          text_secondary_color: data.text_secondary_color || DEFAULT_SETTINGS.text_secondary_color,
          text_link_color: data.text_link_color || DEFAULT_SETTINGS.text_link_color,
          text_heading_color: data.text_heading_color || DEFAULT_SETTINGS.text_heading_color,
          neon_cyan: data.neon_cyan || DEFAULT_SETTINGS.neon_cyan,
          neon_pink: data.neon_pink || DEFAULT_SETTINGS.neon_pink,
          neon_purple: data.neon_purple || DEFAULT_SETTINGS.neon_purple,
          border_radius: data.border_radius || DEFAULT_SETTINGS.border_radius,
          spacing_unit: data.spacing_unit || DEFAULT_SETTINGS.spacing_unit,
          transition_duration: data.transition_duration || DEFAULT_SETTINGS.transition_duration,
          shadow_color: data.shadow_color || DEFAULT_SETTINGS.shadow_color,
          hover_scale: data.hover_scale || DEFAULT_SETTINGS.hover_scale,
          font_family_heading: data.font_family_heading || DEFAULT_SETTINGS.font_family_heading,
          font_family_body: data.font_family_body || DEFAULT_SETTINGS.font_family_body,
          font_size_base: data.font_size_base || DEFAULT_SETTINGS.font_size_base,
          font_weight_normal: data.font_weight_normal || DEFAULT_SETTINGS.font_weight_normal,
          font_weight_bold: data.font_weight_bold || DEFAULT_SETTINGS.font_weight_bold,
          line_height_base: data.line_height_base || DEFAULT_SETTINGS.line_height_base,
          letter_spacing: data.letter_spacing || DEFAULT_SETTINGS.letter_spacing,
        };

        console.log("Initial theme settings fetched:", themeData);
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
          console.log("Received real-time theme update:", payload.new);
          const newData = payload.new;
          
          // Convert payload to Settings type with defaults
          const themeData: Settings = {
            site_title: newData.site_title || DEFAULT_SETTINGS.site_title,
            tagline: newData.tagline || DEFAULT_SETTINGS.tagline,
            primary_color: newData.primary_color || DEFAULT_SETTINGS.primary_color,
            secondary_color: newData.secondary_color || DEFAULT_SETTINGS.secondary_color,
            accent_color: newData.accent_color || DEFAULT_SETTINGS.accent_color,
            logo_url: newData.logo_url,
            favicon_url: newData.favicon_url,
            theme_mode: newData.theme_mode || 'system',
            text_primary_color: newData.text_primary_color || DEFAULT_SETTINGS.text_primary_color,
            text_secondary_color: newData.text_secondary_color || DEFAULT_SETTINGS.text_secondary_color,
            text_link_color: newData.text_link_color || DEFAULT_SETTINGS.text_link_color,
            text_heading_color: newData.text_heading_color || DEFAULT_SETTINGS.text_heading_color,
            neon_cyan: newData.neon_cyan || DEFAULT_SETTINGS.neon_cyan,
            neon_pink: newData.neon_pink || DEFAULT_SETTINGS.neon_pink,
            neon_purple: newData.neon_purple || DEFAULT_SETTINGS.neon_purple,
            border_radius: newData.border_radius || DEFAULT_SETTINGS.border_radius,
            spacing_unit: newData.spacing_unit || DEFAULT_SETTINGS.spacing_unit,
            transition_duration: newData.transition_duration || DEFAULT_SETTINGS.transition_duration,
            shadow_color: newData.shadow_color || DEFAULT_SETTINGS.shadow_color,
            hover_scale: newData.hover_scale || DEFAULT_SETTINGS.hover_scale,
            font_family_heading: newData.font_family_heading || DEFAULT_SETTINGS.font_family_heading,
            font_family_body: newData.font_family_body || DEFAULT_SETTINGS.font_family_body,
            font_size_base: newData.font_size_base || DEFAULT_SETTINGS.font_size_base,
            font_weight_normal: newData.font_weight_normal || DEFAULT_SETTINGS.font_weight_normal,
            font_weight_bold: newData.font_weight_bold || DEFAULT_SETTINGS.font_weight_bold,
            line_height_base: newData.line_height_base || DEFAULT_SETTINGS.line_height_base,
            letter_spacing: newData.letter_spacing || DEFAULT_SETTINGS.letter_spacing,
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

  const updateTheme = async (newTheme: Settings) => {
    try {
      console.log("Updating theme settings:", newTheme);
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
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Settings } from "../../types";
import { DEFAULT_SETTINGS } from "../useSettingsDefaults";

export const useSettingsFetch = () => {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        console.log("Fetching settings from database...");
        const { data, error } = await supabase
          .from("site_settings")
          .select("*")
          .single();

        if (error) {
          console.error("Error fetching settings:", error);
          throw error;
        }
        
        const settingsData: Settings = {
          site_title: data.site_title,
          tagline: data.tagline,
          primary_color: data.primary_color,
          secondary_color: data.secondary_color,
          accent_color: data.accent_color,
          logo_url: data.logo_url,
          favicon_url: data.favicon_url,
          theme_mode: data.theme_mode,
          text_primary_color: data.text_primary_color,
          text_secondary_color: data.text_secondary_color,
          text_link_color: data.text_link_color,
          text_heading_color: data.text_heading_color,
          neon_cyan: data.neon_cyan || DEFAULT_SETTINGS.neon_cyan,
          neon_pink: data.neon_pink || DEFAULT_SETTINGS.neon_pink,
          neon_purple: data.neon_purple || DEFAULT_SETTINGS.neon_purple,
          border_radius: data.border_radius,
          spacing_unit: data.spacing_unit,
          transition_duration: data.transition_duration,
          shadow_color: data.shadow_color,
          hover_scale: data.hover_scale,
          font_family_heading: data.font_family_heading,
          font_family_body: data.font_family_body,
          font_size_base: data.font_size_base,
          font_weight_normal: data.font_weight_normal,
          font_weight_bold: data.font_weight_bold,
          line_height_base: data.line_height_base,
          letter_spacing: data.letter_spacing,
        };
        
        console.log("Settings fetched successfully:", settingsData);
        setSettings(settingsData);
      } catch (error) {
        console.error("Error in fetchSettings:", error);
        toast.error("Failed to load settings");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return {
    settings,
    isLoading,
    setSettings,
  };
};
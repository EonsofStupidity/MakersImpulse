import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Settings } from "../../types";
import { DEFAULT_SETTINGS } from "../useSettingsDefaults";

interface DatabaseSettings {
  site_title: string;
  tagline: string | null;
  primary_color: string | null;
  secondary_color: string | null;
  accent_color: string | null;
  logo_url: string | null;
  favicon_url: string | null;
  theme_mode: "light" | "dark" | "system" | null;
  text_primary_color: string | null;
  text_secondary_color: string | null;
  text_link_color: string | null;
  text_heading_color: string | null;
  neon_cyan: string | null;
  neon_pink: string | null;
  neon_purple: string | null;
  border_radius: string | null;
  spacing_unit: string | null;
  transition_duration: string | null;
  shadow_color: string | null;
  hover_scale: string | null;
  font_family_heading: string;
  font_family_body: string;
  font_size_base: string;
  font_weight_normal: string;
  font_weight_bold: string;
  line_height_base: string;
  letter_spacing: string;
  updated_by: string | null;
}

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
        
        const dbSettings = data as DatabaseSettings;
        const settingsData: Settings = {
          site_title: dbSettings.site_title,
          tagline: dbSettings.tagline || DEFAULT_SETTINGS.tagline,
          primary_color: dbSettings.primary_color || DEFAULT_SETTINGS.primary_color,
          secondary_color: dbSettings.secondary_color || DEFAULT_SETTINGS.secondary_color,
          accent_color: dbSettings.accent_color || DEFAULT_SETTINGS.accent_color,
          logo_url: dbSettings.logo_url,
          favicon_url: dbSettings.favicon_url,
          theme_mode: dbSettings.theme_mode || 'system',
          text_primary_color: dbSettings.text_primary_color || DEFAULT_SETTINGS.text_primary_color,
          text_secondary_color: dbSettings.text_secondary_color || DEFAULT_SETTINGS.text_secondary_color,
          text_link_color: dbSettings.text_link_color || DEFAULT_SETTINGS.text_link_color,
          text_heading_color: dbSettings.text_heading_color || DEFAULT_SETTINGS.text_heading_color,
          neon_cyan: dbSettings.neon_cyan || DEFAULT_SETTINGS.neon_cyan,
          neon_pink: dbSettings.neon_pink || DEFAULT_SETTINGS.neon_pink,
          neon_purple: dbSettings.neon_purple || DEFAULT_SETTINGS.neon_purple,
          border_radius: dbSettings.border_radius || DEFAULT_SETTINGS.border_radius,
          spacing_unit: dbSettings.spacing_unit || DEFAULT_SETTINGS.spacing_unit,
          transition_duration: dbSettings.transition_duration || DEFAULT_SETTINGS.transition_duration,
          shadow_color: dbSettings.shadow_color || DEFAULT_SETTINGS.shadow_color,
          hover_scale: dbSettings.hover_scale || DEFAULT_SETTINGS.hover_scale,
          font_family_heading: dbSettings.font_family_heading,
          font_family_body: dbSettings.font_family_body,
          font_size_base: dbSettings.font_size_base,
          font_weight_normal: dbSettings.font_weight_normal,
          font_weight_bold: dbSettings.font_weight_bold,
          line_height_base: dbSettings.line_height_base,
          letter_spacing: dbSettings.letter_spacing,
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
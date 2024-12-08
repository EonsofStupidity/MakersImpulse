import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { uploadMedia } from "@/utils/media";
import { Settings, SettingsResponse } from "../types";
import { DEFAULT_SETTINGS } from "./useSettingsDefaults";

export const useSettingsForm = () => {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);

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
        
        // Convert the database response to match our Settings type
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

  const handleLogoUpload = async (file: File) => {
    console.log("Handling logo upload with file:", file);
    setLogoFile(file);
  };

  const handleFaviconUpload = async (file: File) => {
    console.log("Handling favicon upload with file:", file);
    setFaviconFile(file);
  };

  const handleResetToDefault = async () => {
    console.log("Resetting settings to default...");
    setIsSaving(true);
    try {
      const { data, error } = await supabase.rpc('update_site_settings', {
        p_site_title: DEFAULT_SETTINGS.site_title,
        p_tagline: DEFAULT_SETTINGS.tagline,
        p_primary_color: DEFAULT_SETTINGS.primary_color,
        p_secondary_color: DEFAULT_SETTINGS.secondary_color,
        p_accent_color: DEFAULT_SETTINGS.accent_color,
        p_text_primary_color: DEFAULT_SETTINGS.text_primary_color,
        p_text_secondary_color: DEFAULT_SETTINGS.text_secondary_color,
        p_text_link_color: DEFAULT_SETTINGS.text_link_color,
        p_text_heading_color: DEFAULT_SETTINGS.text_heading_color,
        p_neon_cyan: DEFAULT_SETTINGS.neon_cyan,
        p_neon_pink: DEFAULT_SETTINGS.neon_pink,
        p_neon_purple: DEFAULT_SETTINGS.neon_purple,
        p_border_radius: DEFAULT_SETTINGS.border_radius,
        p_spacing_unit: DEFAULT_SETTINGS.spacing_unit,
        p_transition_duration: DEFAULT_SETTINGS.transition_duration,
        p_shadow_color: DEFAULT_SETTINGS.shadow_color,
        p_hover_scale: DEFAULT_SETTINGS.hover_scale,
      });

      if (error) throw error;
      
      const response = data as unknown as SettingsResponse;
      console.log("Settings reset successfully:", response);
      setSettings(response.data);
      return response;
    } catch (error) {
      console.error("Error resetting settings:", error);
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  const handleSettingsUpdate = async (formData: Settings) => {
    console.log("Starting settings update with formData:", formData);
    setIsSaving(true);
    try {
      let logo_url = settings?.logo_url;
      let favicon_url = settings?.favicon_url;

      if (logoFile) {
        console.log("Uploading new logo file...");
        logo_url = await uploadMedia(logoFile);
        console.log("Logo uploaded successfully:", logo_url);
      }

      if (faviconFile) {
        console.log("Uploading new favicon file...");
        favicon_url = await uploadMedia(faviconFile);
        console.log("Favicon uploaded successfully:", favicon_url);
      }

      const { data, error } = await supabase.rpc('update_site_settings', {
        p_site_title: formData.site_title,
        p_tagline: formData.tagline,
        p_primary_color: formData.primary_color,
        p_secondary_color: formData.secondary_color,
        p_accent_color: formData.accent_color,
        p_logo_url: logo_url,
        p_favicon_url: favicon_url,
        p_text_primary_color: formData.text_primary_color,
        p_text_secondary_color: formData.text_secondary_color,
        p_text_link_color: formData.text_link_color,
        p_text_heading_color: formData.text_heading_color,
        p_neon_cyan: formData.neon_cyan,
        p_neon_pink: formData.neon_pink,
        p_neon_purple: formData.neon_purple,
        p_border_radius: formData.border_radius,
        p_spacing_unit: formData.spacing_unit,
        p_transition_duration: formData.transition_duration,
        p_shadow_color: formData.shadow_color,
        p_hover_scale: formData.hover_scale,
        p_font_family_heading: formData.font_family_heading,
        p_font_family_body: formData.font_family_body,
        p_font_size_base: formData.font_size_base,
        p_font_weight_normal: formData.font_weight_normal,
        p_font_weight_bold: formData.font_weight_bold,
        p_line_height_base: formData.line_height_base,
        p_letter_spacing: formData.letter_spacing,
      });

      if (error) throw error;

      const response = data as unknown as SettingsResponse;
      console.log("Settings updated successfully:", response);
      setSettings(response.data);
      toast.success("Settings updated successfully");
    } catch (error) {
      console.error("Error in handleSettingsUpdate:", error);
      toast.error("Failed to update settings");
    } finally {
      setIsSaving(false);
    }
  };

  return {
    settings,
    isLoading,
    isSaving,
    logoFile,
    faviconFile,
    handleLogoUpload,
    handleFaviconUpload,
    handleSettingsUpdate,
    handleResetToDefault,
  };
};
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { uploadMedia } from "@/utils/media";
import { Settings, SettingsResponse } from "../types";

const DEFAULT_SETTINGS = {
  site_title: "MakersImpulse",
  tagline: "Create, Share, Inspire",
  primary_color: "#7FFFD4",
  secondary_color: "#FFB6C1",
  accent_color: "#E6E6FA",
  text_primary_color: "#FFFFFF",
  text_secondary_color: "#A1A1AA",
  text_link_color: "#3B82F6",
  text_heading_color: "#FFFFFF",
  neon_cyan: "#41f0db",
  neon_pink: "#ff0abe",
  neon_purple: "#8000ff",
};

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
        
        console.log("Settings fetched successfully:", data);
        setSettings(data);
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
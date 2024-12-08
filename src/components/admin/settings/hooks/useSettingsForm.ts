import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { uploadMedia } from "@/utils/media";

interface Settings {
  site_title: string;
  tagline?: string;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  logo_url?: string;
  favicon_url?: string;
  theme_mode?: "light" | "dark" | "system";
}

export const useSettingsForm = () => {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase
          .from("site_settings")
          .select("*")
          .single();

        if (error) throw error;
        setSettings(data);
      } catch (error) {
        console.error("Error fetching settings:", error);
        toast.error("Failed to load settings");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleLogoUpload = async (file: File) => {
    setLogoFile(file);
  };

  const handleFaviconUpload = async (file: File) => {
    setFaviconFile(file);
  };

  const handleSettingsUpdate = async (formData: Settings) => {
    setIsSaving(true);
    try {
      let logo_url = settings?.logo_url;
      let favicon_url = settings?.favicon_url;

      if (logoFile) {
        logo_url = await uploadMedia(logoFile);
      }

      if (faviconFile) {
        favicon_url = await uploadMedia(faviconFile);
      }

      const { data, error } = await supabase.rpc("update_site_settings", {
        p_site_title: formData.site_title,
        p_tagline: formData.tagline,
        p_primary_color: formData.primary_color,
        p_secondary_color: formData.secondary_color,
        p_accent_color: formData.accent_color,
        p_logo_url: logo_url,
        p_favicon_url: favicon_url,
      });

      if (error) throw error;

      setSettings(data.data);
      toast.success("Settings updated successfully");
    } catch (error) {
      console.error("Error updating settings:", error);
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
  };
};
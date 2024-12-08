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

interface SettingsResponse {
  success: boolean;
  data: Settings;
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

      console.log("Calling update_site_settings RPC with params:", {
        p_site_title: formData.site_title,
        p_tagline: formData.tagline,
        p_primary_color: formData.primary_color,
        p_secondary_color: formData.secondary_color,
        p_accent_color: formData.accent_color,
        p_logo_url: logo_url,
        p_favicon_url: favicon_url,
      });

      const { data, error } = await supabase.rpc("update_site_settings", {
        p_site_title: formData.site_title,
        p_tagline: formData.tagline,
        p_primary_color: formData.primary_color,
        p_secondary_color: formData.secondary_color,
        p_accent_color: formData.accent_color,
        p_logo_url: logo_url,
        p_favicon_url: favicon_url,
      });

      if (error) {
        console.error("RPC error:", error);
        throw error;
      }

      console.log("Raw RPC response:", data);

      // Type guard for response structure
      if (!data || typeof data !== 'object' || !('success' in data) || !('data' in data)) {
        console.error("Invalid response structure:", data);
        throw new Error("Invalid response format from server");
      }

      const response = data as unknown as SettingsResponse;
      console.log("Parsed settings response:", response);
      
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
  };
};
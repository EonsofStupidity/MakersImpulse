import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Settings } from "@/types";
import { toast } from "sonner";

export const useSettingsUpdateHandlers = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);

  const handleLogoUpload = (file: File) => {
    setLogoFile(file);
  };

  const handleFaviconUpload = (file: File) => {
    setFaviconFile(file);
  };

  const handleSettingsUpdate = async (settings: Settings) => {
    setIsSaving(true);
    try {
      const { data, error } = await supabase
        .from("site_settings")
        .update(settings)
        .eq("id", settings.id);

      if (error) {
        throw error;
      }

      toast.success("Settings updated successfully");
      return data;
    } catch (error) {
      console.error("Error updating settings:", error);
      toast.error("Failed to update settings");
    } finally {
      setIsSaving(false);
    }
  };

  return {
    isSaving,
    logoFile,
    faviconFile,
    handleLogoUpload,
    handleFaviconUpload,
    handleSettingsUpdate,
  };
};
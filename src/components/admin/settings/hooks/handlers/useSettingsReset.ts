import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const DEFAULT_SETTINGS = {
  site_title: 'MakersImpulse',
  tagline: 'Create, Share, Inspire',
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
};

export const useSettingsReset = () => {
  const [isResetting, setIsResetting] = useState(false);

  const handleResetToDefault = async () => {
    setIsResetting(true);
    try {
      const { data, error } = await supabase.rpc('update_site_settings', DEFAULT_SETTINGS);

      if (error) throw error;
      toast.success("Theme settings reset to default");
      return data;
    } catch (error) {
      console.error("Error resetting settings:", error);
      toast.error("Failed to reset settings");
      throw error;
    } finally {
      setIsResetting(false);
    }
  };

  return {
    isResetting,
    handleResetToDefault,
  };
};
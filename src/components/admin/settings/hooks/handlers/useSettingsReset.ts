import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { DEFAULT_SETTINGS } from "../useSettingsDefaults";

export const useSettingsReset = () => {
  const [isResetting, setIsResetting] = useState(false);

  const handleResetToDefault = async () => {
    setIsResetting(true);
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
        p_font_family_heading: DEFAULT_SETTINGS.font_family_heading,
        p_font_family_body: DEFAULT_SETTINGS.font_family_body,
        p_font_size_base: DEFAULT_SETTINGS.font_size_base,
        p_font_weight_normal: DEFAULT_SETTINGS.font_weight_normal,
        p_font_weight_bold: DEFAULT_SETTINGS.font_weight_bold,
        p_line_height_base: DEFAULT_SETTINGS.line_height_base,
        p_letter_spacing: DEFAULT_SETTINGS.letter_spacing,
        p_border_radius: DEFAULT_SETTINGS.border_radius,
        p_spacing_unit: DEFAULT_SETTINGS.spacing_unit,
        p_transition_duration: DEFAULT_SETTINGS.transition_duration,
        p_shadow_color: DEFAULT_SETTINGS.shadow_color,
        p_hover_scale: DEFAULT_SETTINGS.hover_scale
      });

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
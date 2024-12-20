import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Settings, Theme } from "@/types/theme";
import { convertDbSettingsToTheme, DEFAULT_THEME_SETTINGS, applyThemeToDocument } from "../../utils/themeUtils";

export const useSettingsFetch = () => {
  return useQuery({
    queryKey: ["site-settings"],
    queryFn: async (): Promise<Settings> => {
      console.log("Fetching site settings...");
      
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .maybeSingle();

      if (error) {
        console.error("Error fetching settings:", error);
        toast.error("Failed to load site settings");
        throw error;
      }

      const themeData = convertDbSettingsToTheme(data);
      
      console.log("Settings fetched successfully:", themeData);
      toast.success("Theme settings loaded");
      return themeData;
    },
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

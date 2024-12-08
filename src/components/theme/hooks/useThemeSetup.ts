import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Settings } from "@/components/admin/settings/types";
import { toast } from "sonner";
import { DatabaseSettingsRow } from "../types/theme";
import { convertDbSettingsToTheme } from "../utils/themeUtils";

export const useThemeSetup = () => {
  const [theme, setTheme] = useState<Settings | null>(null);

  useEffect(() => {
    const fetchInitialTheme = async () => {
      try {
        console.log("Fetching initial theme settings...");
        const { data: rawData, error } = await supabase
          .from("site_settings")
          .select("*")
          .single();

        if (error) throw error;

        const dbSettings = rawData as DatabaseSettingsRow;
        const themeData = convertDbSettingsToTheme(dbSettings);

        console.log("Initial theme settings fetched:", themeData);
        setTheme(themeData);
        toast.success("Theme settings loaded");
      } catch (error) {
        console.error("Error fetching theme:", error);
        toast.error("Failed to load theme settings");
      }
    };

    fetchInitialTheme();
  }, []);

  return { theme, setTheme };
};
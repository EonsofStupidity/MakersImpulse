import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Settings } from "@/types/theme";
import { DatabaseSettingsRow } from "../types/theme";
import { convertDbSettingsToTheme } from "../utils/themeUtils";
import { toast } from "sonner";

export const useThemeSubscription = (setTheme: (theme: Settings) => void) => {
  useEffect(() => {
    console.log("Setting up theme subscription");
    
    const channel = supabase
      .channel('theme_changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'theme_configuration'
        },
        (payload) => {
          console.log("Received real-time theme update:", payload.new);
          const dbSettings = payload.new as DatabaseSettingsRow;
          const themeData = convertDbSettingsToTheme(dbSettings);
          setTheme(themeData);
          toast.success("Theme updated in real-time");
        }
      )
      .subscribe((status) => {
        console.log("Theme subscription status:", status);
      });

    return () => {
      console.log("Cleaning up theme subscription");
      channel.unsubscribe();
    };
  }, [setTheme]);
};
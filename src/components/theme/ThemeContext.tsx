import React, { createContext, useContext, useEffect, useState } from "react";
import { Settings } from "@/components/admin/settings/types";
import { useThemeSetup } from "./hooks/useThemeSetup";
import { useThemeSubscription } from "./hooks/useThemeSubscription";
import { applyThemeToDocument } from "./utils/themeUtils";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuthStore } from '@/lib/store/auth-store';
import { convertToUpdateParams } from "@/components/admin/settings/types/settings";

interface ThemeContextType {
  theme: Settings | null;
  updateTheme: (newTheme: Settings) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme, setTheme } = useThemeSetup();
  const { session } = useAuthStore();
  
  useThemeSubscription(setTheme);

  useEffect(() => {
    console.log('ThemeProvider mounted, current theme:', theme?.site_title);
  }, [theme]);

  const updateTheme = async (newTheme: Settings) => {
    console.log('Updating theme with new settings:', newTheme.site_title);
    
    try {
      if (!session?.user) {
        console.log('No active session, applying theme without persistence');
        applyThemeToDocument(newTheme);
        setTheme(newTheme);
        return;
      }

      const { error } = await supabase.rpc('update_site_settings', convertToUpdateParams(newTheme));

      if (error) throw error;
      
      setTheme(newTheme);
      applyThemeToDocument(newTheme);
      toast.success("Theme updated successfully", {
        description: "Your changes have been saved and applied"
      });
    } catch (error) {
      console.error("Error updating theme:", error);
      toast.error("Failed to update theme", {
        description: "Please try again or contact support if the issue persists"
      });
    }
  };

  if (!theme) {
    console.log("ThemeProvider: Theme not loaded yet");
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
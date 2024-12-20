import React, { createContext, useContext } from 'react';
import { ThemeContextType, ThemeBase } from '@/types/theme';
import { useThemeSetup } from './hooks/useThemeSetup';
import { useThemeSubscription } from './hooks/useThemeSubscription';
import { applyThemeToDocument } from './utils/themeUtils';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuthStore } from '@/lib/store/auth-store';
import { convertToUpdateParams } from '@/utils/transforms/settings';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme, setTheme } = useThemeSetup();
  const { session } = useAuthStore();
  
  useThemeSubscription(setTheme);

  const updateTheme = async (newTheme: ThemeBase) => {
    try {
      if (!session?.user) {
        applyThemeToDocument(newTheme);
        setTheme(newTheme);
        return;
      }

      const params = convertToUpdateParams(newTheme);
      const { error } = await supabase.rpc('update_site_settings', params);

      if (error) throw error;
      
      setTheme(newTheme);
      applyThemeToDocument(newTheme);
      toast.success("Theme updated successfully");
    } catch (error) {
      console.error("Error updating theme:", error);
      toast.error("Failed to update theme");
    }
  };

  if (!theme) {
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
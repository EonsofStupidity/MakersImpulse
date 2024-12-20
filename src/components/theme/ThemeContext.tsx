import React, { createContext, useContext, useEffect } from 'react';
import { ThemeContextType } from '@/types/theme/core/context';
import { ThemeBase } from '@/types/theme/core/base';
import { useThemeSetup } from './hooks/useThemeSetup';
import { useThemeSubscription } from './hooks/useThemeSubscription';
import { applyThemeToDocument } from './utils/themeUtils';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuthStore } from '@/lib/store/auth-store';
import { convertToUpdateParams } from '@/utils/transforms/settings';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme, setTheme, isLoading } = useThemeSetup();
  const { session } = useAuthStore();
  
  useThemeSubscription(setTheme);

  // Apply theme when it changes
  useEffect(() => {
    if (theme) {
      console.log('Applying theme:', theme);
      applyThemeToDocument(theme);
    }
  }, [theme]);

  const updateTheme = async (newTheme: Partial<ThemeBase>) => {
    try {
      if (!session?.user) {
        console.log('No session, applying theme locally:', newTheme);
        applyThemeToDocument({ ...theme, ...newTheme });
        setTheme({ ...theme, ...newTheme });
        return;
      }

      console.log('Updating theme in database:', newTheme);
      const params = convertToUpdateParams(newTheme);
      const { error } = await supabase.rpc('update_site_settings', params);

      if (error) throw error;
      
      setTheme({ ...theme, ...newTheme });
      applyThemeToDocument({ ...theme, ...newTheme });
      toast.success("Theme updated successfully");
    } catch (error) {
      console.error("Error updating theme:", error);
      toast.error("Failed to update theme");
    }
  };

  if (isLoading) {
    return null;
  }

  if (!theme) {
    console.error("No theme data available");
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
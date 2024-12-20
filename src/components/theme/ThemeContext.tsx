import React, { createContext, useContext, useEffect, useCallback, useMemo } from 'react';
import { ThemeContextType } from '@/types/theme/core/context';
import { ThemeBase } from '@/types/theme/core/base';
import { useThemeSetup } from './hooks/useThemeSetup';
import { useThemeSubscription } from './hooks/useThemeSubscription';
import { applyThemeToDocument } from './utils/themeUtils';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuthStore } from '@/lib/store/auth-store';
import { convertToUpdateParams } from '@/utils/transforms/settings';
import { useDebouncedCallback } from './hooks/useDebouncedCallback';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme, setTheme, isLoading } = useThemeSetup();
  const { session } = useAuthStore();
  
  useThemeSubscription(setTheme);

  // Debounced theme application
  const debouncedApplyTheme = useDebouncedCallback((newTheme: ThemeBase) => {
    console.log('Applying debounced theme:', newTheme);
    applyThemeToDocument(newTheme);
  }, theme?.preview_preferences?.update_debounce_ms || 100);

  // Apply theme when it changes
  useEffect(() => {
    if (theme) {
      const isRealTimeUpdates = theme.preview_preferences?.real_time_updates ?? true;
      if (isRealTimeUpdates) {
        debouncedApplyTheme(theme);
      } else {
        applyThemeToDocument(theme);
      }
    }
  }, [theme, debouncedApplyTheme]);

  const updateTheme = useCallback(async (newTheme: Partial<ThemeBase>) => {
    try {
      if (!session?.user) {
        console.log('No session, applying theme locally:', newTheme);
        const updatedTheme = { ...theme, ...newTheme };
        applyThemeToDocument(updatedTheme);
        setTheme(updatedTheme);
        return;
      }

      console.log('Updating theme in database:', newTheme);
      const params = convertToUpdateParams(newTheme);
      const { error } = await supabase.rpc('update_site_settings', params);

      if (error) throw error;
      
      setTheme({ ...theme, ...newTheme });
      
      const isRealTimeUpdates = theme?.preview_preferences?.real_time_updates ?? true;
      if (isRealTimeUpdates) {
        debouncedApplyTheme({ ...theme, ...newTheme });
      }
      
      toast.success("Theme updated successfully");
    } catch (error) {
      console.error("Error updating theme:", error);
      toast.error("Failed to update theme");
    }
  }, [theme, setTheme, session, debouncedApplyTheme]);

  const contextValue = useMemo(() => ({
    theme,
    updateTheme,
    previewPreferences: theme?.preview_preferences || {
      real_time_updates: true,
      animation_enabled: true,
      glass_effect_level: 'medium',
      update_debounce_ms: 100
    }
  }), [theme, updateTheme]);

  if (isLoading) {
    return null;
  }

  if (!theme) {
    console.error("No theme data available");
    return null;
  }

  return (
    <ThemeContext.Provider value={contextValue}>
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
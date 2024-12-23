import { useState, useCallback } from 'react';
import { ThemeSyncState, ThemeBase } from '@/types/theme/core/types';
import { useTheme } from '@/components/theme/ThemeContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useDebouncedCallback } from '@/hooks/useDebouncedCallback';

export const useThemeSync = (options: { debounce_ms?: number } = {}) => {
  const [syncState, setSyncState] = useState<ThemeSyncState>({
    status: 'synced',
    last_sync: new Date().toISOString()
  });

  const { theme } = useTheme();

  const syncTheme = useCallback(async () => {
    if (!theme?.id) return;

    try {
      setSyncState(prev => ({ ...prev, status: 'syncing' }));

      const { error } = await supabase
        .from('theme_configuration')
        .update({
          ...theme,
          last_sync: new Date().toISOString()
        })
        .eq('id', theme.id);

      if (error) throw error;

      setSyncState({
        status: 'completed',
        last_sync: new Date().toISOString()
      });

      toast.success('Theme synced successfully');
    } catch (error) {
      console.error('Theme sync error:', error);
      setSyncState(prev => ({
        ...prev,
        status: 'error',
        error: error.message
      }));
      toast.error('Failed to sync theme');
    }
  }, [theme]);

  const debouncedSync = useDebouncedCallback(
    syncTheme,
    options.debounce_ms || 1000
  );

  return {
    syncState,
    syncTheme: debouncedSync
  };
};
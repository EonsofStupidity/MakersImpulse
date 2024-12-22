import { useState, useCallback } from 'react';
import { ThemeSyncState, ThemeSyncOptions } from '@/types/theme/core/sync';
import { useTheme } from '@/components/theme/ThemeContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useDebouncedCallback } from '@/hooks/useDebouncedCallback';

export const useThemeSync = (options: Partial<ThemeSyncOptions> = {}) => {
  const [syncState, setSyncState] = useState<ThemeSyncState>({
    last_sync: new Date().toISOString(),
    sync_status: 'synced',
    pending_changes: {}
  });

  const { theme } = useTheme();

  const syncTheme = useCallback(async () => {
    if (!theme?.id) return;

    try {
      setSyncState(prev => ({ ...prev, sync_status: 'syncing' }));

      const { error } = await supabase
        .from('theme_configuration')
        .update({
          ...theme,
          last_sync: new Date().toISOString()
        })
        .eq('id', theme.id);

      if (error) throw error;

      setSyncState(prev => ({
        ...prev,
        sync_status: 'synced',
        last_sync: new Date().toISOString(),
        pending_changes: {}
      }));

      toast.success('Theme synced successfully');
    } catch (error) {
      console.error('Theme sync error:', error);
      setSyncState(prev => ({
        ...prev,
        sync_status: 'error',
        sync_error: error.message
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
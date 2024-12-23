import { useState, useEffect } from 'react';
import { ThemeLifecycleState, ThemeBase } from '@/types/theme/core/types';
import { useTheme } from '@/components/theme/ThemeContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useThemeLifecycle = () => {
  const [lifecycleState, setLifecycleState] = useState<ThemeLifecycleState>({
    status: 'initializing'
  });
  const { theme, updateTheme } = useTheme();

  useEffect(() => {
    const initializeTheme = async () => {
      try {
        const { data: themeConfig, error } = await supabase
          .from('theme_configuration')
          .select('*')
          .single();

        if (error) throw error;

        await updateTheme(themeConfig as Partial<ThemeBase>);
        setLifecycleState({ status: 'ready' });
        toast.success('Theme initialized successfully');
      } catch (error) {
        console.error('Theme initialization error:', error);
        setLifecycleState({
          status: 'error',
          error: 'Failed to initialize theme'
        });
        toast.error('Failed to initialize theme');
      }
    };

    initializeTheme();

    return () => {
      setLifecycleState({
        status: 'initializing'
      });
    };
  }, [updateTheme]);

  const handleStateTransition = async (newState: ThemeLifecycleState) => {
    try {
      setLifecycleState(newState);
      
      if (newState.status === 'deactivating') {
        await supabase
          .from('theme_configuration')
          .update({ last_sync: new Date().toISOString() })
          .eq('id', theme?.id);
      }
    } catch (error) {
      console.error('Theme state transition error:', error);
      toast.error('Failed to transition theme state');
    }
  };

  return {
    lifecycleState,
    handleStateTransition
  };
};
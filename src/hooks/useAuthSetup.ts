import { useCallback, useRef } from 'react';
import { useAuthStore } from '@/lib/store/auth-store';
import { toast } from "sonner";
import { useSessionManagement } from './auth/useSessionManagement';
import { useAuthValidation } from './auth/useAuthValidation';
import { handleSessionTimeout } from '@/utils/auth/securityHandlers';
import { supabase } from "@/integrations/supabase/client";

export const useAuthSetup = () => {
  const { setLoading, setError } = useAuthStore();
  const initialSetupDone = useRef(false);
  const sessionTimeoutRef = useRef<NodeJS.Timeout>();
  
  const { handleSessionUpdate } = useSessionManagement();
  const { validateAuthAttempt } = useAuthValidation();
  
  const handleAuthChange = useCallback(async (session) => {
    console.log('Handling auth change:', session?.user?.id);
    setLoading(true);
    setError(null);
    
    try {
      if (sessionTimeoutRef.current) clearTimeout(sessionTimeoutRef.current);

      if (session?.user) {
        const loadingToast = toast.loading('Authenticating...');

        await validateAuthAttempt(session);

        sessionTimeoutRef.current = handleSessionTimeout(async () => {
          await supabase.auth.signOut();
        });

        await handleSessionUpdate(session);
        
        toast.dismiss(loadingToast);
        toast.success('Successfully authenticated');
      } else {
        await handleSessionUpdate(session);
        toast.success('Signed out successfully');
      }
    } catch (error) {
      console.error('Error in auth change handler:', error);
      setError(error instanceof Error ? error : new Error('An unexpected error occurred'));
      
      if (session?.user) {
        await handleSecurityEvent(
          session.user.id,
          'auth_error',
          'high',
          { error: error instanceof Error ? error.message : 'Unknown error' }
        );
      }
      
      toast.error('Authentication error', {
        description: error instanceof Error ? error.message : 'An unexpected error occurred'
      });
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, handleSessionUpdate, validateAuthAttempt]);

  return { handleAuthChange, initialSetupDone };
};
import { useCallback, useRef } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useAuthStore } from '@/lib/store/auth-store';
import { toast } from "sonner";
import { storeSessionLocally, getStoredSession } from '@/utils/auth/offlineAuth';
import { checkRateLimit } from '@/utils/rateLimiting';
import { validateSession, handleSecurityEvent, handleSessionTimeout } from '@/utils/auth/securityHandlers';
import { refreshSession, registerUserSession, cleanupUserSessions } from '@/utils/auth/sessionManager';
import { executeWithRetry, defaultRetryConfig } from '@/utils/auth/retryHandler';
import { motion, AnimatePresence } from "framer-motion";

const MAX_AUTH_ATTEMPTS = 3;
const AUTH_WINDOW = '5 minutes';

export const useAuthSetup = () => {
  const { setSession, setUser, setLoading, setError } = useAuthStore();
  const initialSetupDone = useRef(false);
  const sessionTimeoutRef = useRef<NodeJS.Timeout>();
  
  const handleAuthChange = useCallback(async (session) => {
    console.log('Handling auth change:', session?.user?.id);
    setLoading(true);
    setError(null);
    
    try {
      if (sessionTimeoutRef.current) clearTimeout(sessionTimeoutRef.current);

      if (session?.user) {
        // Show loading toast for better UX
        const loadingToast = toast.loading('Authenticating...');

        // Validate session and check rate limits
        const [isValid, withinLimit] = await Promise.all([
          validateSession(session),
          checkRateLimit(session.user.id, 'auth_operation', MAX_AUTH_ATTEMPTS, AUTH_WINDOW)
        ]);

        if (!isValid || !withinLimit) {
          throw new Error(
            !isValid ? 'Invalid session' : 'Too many auth attempts. Please try again later.'
          );
        }

        // Store session and register it
        storeSessionLocally(session);
        await registerUserSession(session.user.id);

        // Set up session timeout
        sessionTimeoutRef.current = handleSessionTimeout(async () => {
          await supabase.auth.signOut();
        });

        // Fetch user profile with retry logic
        const fetchProfile = async () => {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
            
          if (error) throw error;
          if (!profile) throw new Error('No profile found');
          
          return profile;
        };

        const profile = await executeWithRetry(fetchProfile, defaultRetryConfig);

        setSession(session);
        setUser({ ...session.user, role: profile.role });
        
        await handleSecurityEvent(session.user.id, 'successful_auth', 'low');
        
        // Dismiss loading toast and show success
        toast.dismiss(loadingToast);
        toast.success('Successfully authenticated', {
          description: `Welcome back${profile.display_name ? `, ${profile.display_name}` : ''}!`,
        });
        
      } else {
        // Cleanup on signout
        storeSessionLocally(null);
        setSession(null);
        setUser(null);
        
        const currentUser = await supabase.auth.getUser();
        if (currentUser.data.user) {
          await cleanupUserSessions(currentUser.data.user.id);
        }

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
  }, [setSession, setUser, setLoading, setError]);

  return { handleAuthChange, initialSetupDone };
};
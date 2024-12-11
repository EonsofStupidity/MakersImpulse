import { useCallback, useRef } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useAuthStore } from '@/lib/store/auth-store';
import { toast } from "sonner";
import { storeSessionLocally, getStoredSession } from '@/utils/auth/offlineAuth';
import { checkRateLimit } from '@/utils/rateLimiting';
import { 
  checkConcurrentSessions, 
  registerSession, 
  deactivateSession,
  cleanupInactiveSessions,
  logSecurityEvent,
  SESSION_TIMEOUT 
} from '@/utils/auth/securityUtils';

const MAX_AUTH_ATTEMPTS = 3;
const AUTH_WINDOW = '5 minutes';

export const useAuthSetup = () => {
  const { setSession, setUser, setLoading, setError } = useAuthStore();
  const initialSetupDone = useRef(false);
  const sessionRefreshTimeout = useRef<NodeJS.Timeout>();
  const networkRetryTimeout = useRef<NodeJS.Timeout>();
  const sessionTimeoutRef = useRef<NodeJS.Timeout>();
  
  const handleAuthChange = useCallback(async (session) => {
    console.log('Handling auth change:', session?.user?.id);
    setLoading(true);
    setError(null);
    
    try {
      // Clear existing timeouts
      if (sessionRefreshTimeout.current) clearTimeout(sessionRefreshTimeout.current);
      if (networkRetryTimeout.current) clearTimeout(networkRetryTimeout.current);
      if (sessionTimeoutRef.current) clearTimeout(sessionTimeoutRef.current);

      if (session?.user) {
        // Check rate limiting
        const withinLimit = await checkRateLimit(
          session.user.id,
          'auth_operation',
          MAX_AUTH_ATTEMPTS,
          AUTH_WINDOW
        );

        if (!withinLimit) {
          throw new Error('Too many auth attempts. Please try again later.');
        }

        // Check concurrent sessions
        const canCreateSession = await checkConcurrentSessions(session.user.id);
        if (!canCreateSession) {
          throw new Error('Maximum number of concurrent sessions reached');
        }

        // Store session locally for offline support
        storeSessionLocally(session);

        // Register new session
        await registerSession(
          session.user.id,
          'Browser Session',
          // You might want to implement proper IP and UA detection
          undefined,
          navigator.userAgent
        );

        // Set up session timeout
        sessionTimeoutRef.current = setTimeout(async () => {
          toast.error('Session expired', {
            description: 'Please sign in again',
          });
          await supabase.auth.signOut();
        }, SESSION_TIMEOUT);

        // Set up refresh before token expires
        if (session.expires_at) {
          const expiresIn = session.expires_at - Math.floor(Date.now() / 1000);
          const refreshTime = Math.max(0, (expiresIn - 60) * 1000);
          
          sessionRefreshTimeout.current = setTimeout(async () => {
            try {
              const { data, error } = await supabase.auth.refreshSession();
              if (error) throw error;
              if (data.session) {
                handleAuthChange(data.session);
              }
            } catch (error) {
              console.error('Session refresh error:', error);
              const storedSession = getStoredSession();
              if (storedSession) {
                await handleAuthChange(storedSession);
              } else {
                toast.error('Session expired', {
                  description: 'Please sign in again',
                });
                await supabase.auth.signOut();
              }
            }
          }, refreshTime);
        }

        try {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
            
          if (error) {
            console.error('Error fetching profile:', error);
            await logSecurityEvent(session.user.id, 'profile_fetch_error', 'medium', { error: error.message });
            toast.error('Error fetching user profile', {
              description: error.message,
            });
            return;
          }

          if (!profile) {
            console.error('No profile found');
            await logSecurityEvent(session.user.id, 'missing_profile', 'high');
            toast.error('No user profile found');
            return;
          }

          setSession(session);
          setUser({ ...session.user, role: profile.role });
          console.log('User role set:', profile.role);
          
          // Log successful auth
          await logSecurityEvent(session.user.id, 'successful_auth', 'low');
          
        } catch (error) {
          console.error('Error in profile fetch:', error);
          
          // Implement exponential backoff for retries
          const retryFetch = async (attempt = 1, maxAttempts = 3) => {
            if (attempt > maxAttempts) {
              await logSecurityEvent(session.user.id, 'profile_fetch_failed', 'high');
              toast.error('Failed to load profile after multiple attempts');
              await supabase.auth.signOut();
              return;
            }

            const delay = Math.min(1000 * Math.pow(2, attempt - 1), 10000);
            networkRetryTimeout.current = setTimeout(async () => {
              try {
                const { data: profile, error } = await supabase
                  .from('profiles')
                  .select('*')
                  .eq('id', session.user.id)
                  .single();

                if (error) throw error;
                if (profile) {
                  setSession(session);
                  setUser({ ...session.user, role: profile.role });
                }
              } catch (error) {
                console.error(`Retry ${attempt} failed:`, error);
                retryFetch(attempt + 1, maxAttempts);
              }
            }, delay);
          };

          retryFetch();
        }
      } else {
        // Clear stored session on signout
        storeSessionLocally(null);
        setSession(null);
        setUser(null);
        
        // Cleanup inactive sessions if we have the user ID
        const currentUser = supabase.auth.getUser();
        if (currentUser) {
          await cleanupInactiveSessions((await currentUser).data.user?.id || '');
        }
      }
    } catch (error) {
      console.error('Error in auth change handler:', error);
      setError(error instanceof Error ? error : new Error('An unexpected error occurred'));
      
      // Log security event for auth error
      if (session?.user) {
        await logSecurityEvent(
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
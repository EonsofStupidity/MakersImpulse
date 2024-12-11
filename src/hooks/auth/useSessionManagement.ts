import { useCallback } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useAuthStore } from '@/lib/store/auth-store';
import { storeSessionLocally } from '@/utils/auth/offlineAuth';
import { registerUserSession, cleanupUserSessions } from '@/utils/auth/sessionManager';
import { handleSecurityEvent } from '@/utils/auth/securityHandlers';

export const useSessionManagement = () => {
  const { setSession, setUser } = useAuthStore();

  const handleSessionUpdate = useCallback(async (session: any) => {
    if (session?.user) {
      try {
        // Store session locally for offline access
        storeSessionLocally(session);
        await registerUserSession(session.user.id);

        // Fetch user profile with role information
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
          
        if (error) {
          console.error('Error fetching profile:', error);
          throw error;
        }
        
        if (!profile) {
          console.error('No profile found');
          throw new Error('No profile found');
        }
        
        setSession(session);
        setUser({ ...session.user, role: profile.role });
        
        await handleSecurityEvent(session.user.id, 'successful_auth', 'low');

        // Set up refresh token timer
        const expiresIn = session.expires_in || 3600;
        const refreshBuffer = 60; // Refresh 1 minute before expiry
        const refreshTimeout = (expiresIn - refreshBuffer) * 1000;
        
        setTimeout(async () => {
          console.log('Refreshing session token');
          const { data: { session: newSession }, error: refreshError } = await supabase.auth.refreshSession();
          
          if (refreshError || !newSession) {
            console.error('Failed to refresh session:', refreshError);
            // Handle refresh failure
            await supabase.auth.signOut();
            setSession(null);
            setUser(null);
          }
        }, refreshTimeout);

      } catch (error) {
        console.error('Session update error:', error);
        throw error;
      }
    } else {
      // Clear session data
      storeSessionLocally(null);
      setSession(null);
      setUser(null);
      
      const currentUser = await supabase.auth.getUser();
      if (currentUser.data.user) {
        await cleanupUserSessions(currentUser.data.user.id);
      }
    }
  }, [setSession, setUser]);

  return { handleSessionUpdate };
};
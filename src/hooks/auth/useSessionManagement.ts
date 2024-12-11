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
      storeSessionLocally(session);
      await registerUserSession(session.user.id);

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
        
      if (error) throw error;
      if (!profile) throw new Error('No profile found');
      
      setSession(session);
      setUser({ ...session.user, role: profile.role });
      
      await handleSecurityEvent(session.user.id, 'successful_auth', 'low');
    } else {
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
import { useCallback, useRef } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useAuthStore } from '@/lib/store/auth-store';
import { toast } from "sonner";

export const useAuthSetup = () => {
  const { setSession, setUser, setLoading } = useAuthStore();
  const initialSetupDone = useRef(false);
  const sessionRefreshTimeout = useRef<NodeJS.Timeout>();
  
  const handleAuthChange = useCallback(async (session) => {
    console.log('Handling auth change:', session?.user?.id);
    setLoading(true);
    
    try {
      if (session?.user) {
        // Clear any existing refresh timeout
        if (sessionRefreshTimeout.current) {
          clearTimeout(sessionRefreshTimeout.current);
        }

        // Set up refresh before token expires
        if (session.expires_at) {
          const expiresIn = session.expires_at - Math.floor(Date.now() / 1000);
          const refreshTime = Math.max(0, (expiresIn - 60) * 1000); // Refresh 1 minute before expiry
          
          sessionRefreshTimeout.current = setTimeout(async () => {
            try {
              const { data, error } = await supabase.auth.refreshSession();
              if (error) throw error;
              if (data.session) {
                handleAuthChange(data.session);
              }
            } catch (error) {
              console.error('Session refresh error:', error);
              toast.error('Session expired', {
                description: 'Please sign in again',
              });
              await supabase.auth.signOut();
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
            toast.error('Error fetching user profile', {
              description: error.message,
            });
            return;
          }

          if (!profile) {
            console.error('No profile found');
            toast.error('No user profile found');
            return;
          }

          setSession(session);
          setUser({ ...session.user, role: profile.role });
          console.log('User role set:', profile.role);
          
        } catch (error) {
          console.error('Error in profile fetch:', error);
          toast.error('Authentication error', {
            description: 'Failed to load user profile'
          });
          await supabase.auth.signOut();
        }
      } else {
        // Clear any existing refresh timeout on signout
        if (sessionRefreshTimeout.current) {
          clearTimeout(sessionRefreshTimeout.current);
        }
        setSession(null);
        setUser(null);
      }
    } catch (error) {
      console.error('Error in auth change handler:', error);
      toast.error('Authentication error', {
        description: error instanceof Error ? error.message : 'An unexpected error occurred'
      });
    } finally {
      setLoading(false);
    }
  }, [setSession, setUser, setLoading]);

  return { handleAuthChange, initialSetupDone };
};
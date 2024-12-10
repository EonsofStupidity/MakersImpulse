import { useCallback, useRef } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useAuthStore } from '@/lib/store/auth-store';
import { toast } from "sonner";

export const useAuthSetup = () => {
  const { setSession, setUser, setLoading } = useAuthStore();
  const initialSetupDone = useRef(false);
  
  const handleAuthChange = useCallback(async (session) => {
    console.log('Handling auth change:', session?.user?.id);
    
    if (session?.user) {
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
        
        if (profile.role !== 'admin' && profile.role !== 'super_admin') {
          toast.error('Access denied', {
            description: 'You need admin privileges to access the dashboard'
          });
        }
      } catch (error) {
        console.error('Error in auth change handler:', error);
        toast.error('Authentication error', {
          description: error.message
        });
      }
    } else {
      setSession(null);
      setUser(null);
    }
    setLoading(false);
  }, [setSession, setUser, setLoading]);

  return { handleAuthChange, initialSetupDone };
};
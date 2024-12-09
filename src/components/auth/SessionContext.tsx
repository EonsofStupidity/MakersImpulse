import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AuthSession } from '@/integrations/supabase/types/auth';
import { Session } from '@supabase/supabase-js';
import { toast } from 'sonner';

interface SessionContextType {
  session: AuthSession | null;
  isLoading: boolean;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('SessionProvider: Starting initialization');
    
    const initializeSession = async () => {
      try {
        const { data: { session: initialSession }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Initial session fetch error:', error);
          throw error;
        }

        if (initialSession) {
          console.log('Initial session found:', initialSession.user.id);
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('role, username, display_name')
            .eq('id', initialSession.user.id)
            .single();

          if (profileError) {
            console.error('Profile fetch error:', profileError);
            throw profileError;
          }

          setSession({
            user: {
              id: initialSession.user.id,
              email: initialSession.user.email,
              role: profile?.role || 'subscriber',
              username: profile?.username || initialSession.user.email?.split('@')[0],
              display_name: profile?.display_name || initialSession.user.email?.split('@')[0]
            },
            expires_at: initialSession.expires_at
          });
        } else {
          console.log('No initial session found');
          setSession(null);
        }
      } catch (error) {
        console.error('Session initialization error:', error);
        toast.error('Error initializing session');
        setSession(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      console.log('Auth state changed:', event, currentSession?.user?.id);
      
      if (currentSession) {
        try {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('role, username, display_name')
            .eq('id', currentSession.user.id)
            .single();

          if (profileError) throw profileError;

          const sessionData = {
            user: {
              id: currentSession.user.id,
              email: currentSession.user.email,
              role: profile?.role || 'subscriber',
              username: profile?.username || currentSession.user.email?.split('@')[0],
              display_name: profile?.display_name || currentSession.user.email?.split('@')[0]
            },
            expires_at: currentSession.expires_at
          };

          console.log('Setting session with data:', sessionData);
          setSession(sessionData);
          toast.success(`Welcome back, ${sessionData.user.display_name}`);
        } catch (error) {
          console.error('Error in auth state change:', error);
          toast.error('Error updating session');
          setSession(null);
        }
      } else {
        console.log('No session in auth state change');
        setSession(null);
      }
      
      setIsLoading(false);
    });

    return () => {
      console.log('SessionProvider: Cleaning up subscription');
      subscription.unsubscribe();
    };
  }, []);

  return (
    <SessionContext.Provider value={{ session, isLoading }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};
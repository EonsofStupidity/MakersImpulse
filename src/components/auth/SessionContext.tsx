import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { AuthSession } from './types';

interface SessionContextType {
  session: AuthSession | null;
  isLoading: boolean;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    console.log('SessionProvider: Initializing session...');

    // Initial session check
    supabase.auth.getSession().then(async ({ data: { session: initialSession }, error }) => {
      if (!mounted) return;

      if (error) {
        console.error('Session initialization error:', error);
        setIsLoading(false);
        return;
      }

      if (initialSession) {
        try {
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', initialSession.user.id)
            .single();

          const sessionData: AuthSession = {
            user: {
              id: initialSession.user.id,
              email: initialSession.user.email,
              role: profile?.role || 'subscriber',
            },
            expires_at: initialSession.expires_at,
          };

          console.log('Initial session loaded:', sessionData);
          setSession(sessionData);
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      }
      setIsLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      console.log('Auth state changed:', event, currentSession?.user?.id);

      if (!mounted) return;

      if (currentSession) {
        try {
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', currentSession.user.id)
            .single();

          const sessionData: AuthSession = {
            user: {
              id: currentSession.user.id,
              email: currentSession.user.email,
              role: profile?.role || 'subscriber',
            },
            expires_at: currentSession.expires_at,
          };

          console.log('Session updated:', sessionData);
          setSession(sessionData);

          if (event === 'SIGNED_IN') {
            toast.success('Successfully signed in');
          }
        } catch (error) {
          console.error('Error updating session:', error);
          toast.error('Error updating session');
        }
      } else {
        console.log('No session found, clearing session state');
        setSession(null);
        if (event === 'SIGNED_OUT') {
          toast.info('Signed out');
        }
      }
    });

    return () => {
      mounted = false;
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
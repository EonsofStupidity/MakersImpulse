import { createContext, useContext, useEffect, useState, ReactNode, useMemo } from 'react';
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
    console.log('SessionProvider mounted');

    const initializeSession = async () => {
      try {
        const { data: { session: initialSession }, error } = await supabase.auth.getSession();
        
        if (error) throw error;

        if (initialSession && mounted) {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', initialSession.user.id)
            .single();

          if (profileError) throw profileError;

          const sessionData: AuthSession = {
            user: {
              id: initialSession.user.id,
              email: initialSession.user.email,
              role: profile?.role || 'subscriber',
            },
            expires_at: initialSession.expires_at,
          };

          if (mounted) {
            console.log('Setting initial session:', sessionData);
            setSession(sessionData);
          }
        }
      } catch (error) {
        console.error('Session initialization error:', error);
        if (mounted) {
          setSession(null);
          toast.error('Error initializing session');
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    initializeSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      if (!mounted) return;
      console.log('Auth state changed:', event, currentSession?.user?.id);

      try {
        if (currentSession) {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', currentSession.user.id)
            .single();

          if (profileError) throw profileError;

          const sessionData: AuthSession = {
            user: {
              id: currentSession.user.id,
              email: currentSession.user.email,
              role: profile?.role || 'subscriber',
            },
            expires_at: currentSession.expires_at,
          };

          if (mounted) {
            console.log('Updating session on auth change:', sessionData);
            setSession(sessionData);
          }

          if (event === 'SIGNED_IN') {
            toast.success('Successfully signed in');
          }
        } else {
          if (mounted) {
            console.log('Clearing session state');
            setSession(null);
          }
          
          if (event === 'SIGNED_OUT') {
            toast.info('Signed out');
          }
        }
      } catch (error) {
        console.error('Error handling auth state change:', error);
        if (mounted) {
          setSession(null);
          toast.error('Error updating session');
        }
      }
    });

    return () => {
      console.log('SessionProvider unmounting');
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const value = useMemo(() => ({
    session,
    isLoading
  }), [session, isLoading]);

  return (
    <SessionContext.Provider value={value}>
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
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
    console.log('SessionProvider: Starting initialization');

    const initializeSession = async () => {
      try {
        const { data: { session: initialSession }, error } = await supabase.auth.getSession();
        
        if (error) throw error;
        
        if (initialSession && mounted) {
          console.log('Initial session found:', initialSession.user.id);
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

          console.log('Session initialized with role:', sessionData.user.role);
          setSession(sessionData);
        } else {
          console.log('No initial session found');
          setSession(null);
        }
      } catch (error) {
        console.error('Session initialization error:', error);
        toast.error('Error initializing session');
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    initializeSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      console.log('Auth state changed:', event, currentSession?.user?.id);

      if (!mounted) return;

      try {
        if (currentSession) {
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
        } else {
          console.log('Clearing session state');
          setSession(null);
          if (event === 'SIGNED_OUT') {
            toast.info('Signed out');
          }
        }
      } catch (error) {
        console.error('Error updating session:', error);
        toast.error('Error updating session');
      }
    });

    return () => {
      console.log('SessionProvider: Cleaning up');
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
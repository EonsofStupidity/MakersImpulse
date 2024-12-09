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
    console.log('SessionProvider: Initializing session...');

    const initializeSession = async () => {
      try {
        const { data: { session: initialSession }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error fetching initial session:', error);
          return;
        }

        if (initialSession) {
          setSession({
            user: {
              id: initialSession.user.id,
              email: initialSession.user.email,
              role: initialSession.user.user_metadata?.role || 'subscriber',
            },
            expires_at: initialSession.expires_at,
          });
        }
      } catch (error) {
        console.error('Session initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      console.log('Auth state changed:', event);

      if (currentSession) {
        setSession({
          user: {
            id: currentSession.user.id,
            email: currentSession.user.email,
            role: currentSession.user.user_metadata?.role || 'subscriber',
          },
          expires_at: currentSession.expires_at,
        });

        if (event === 'SIGNED_IN') {
          toast.success('Successfully signed in');
        }
      } else {
        setSession(null);
        if (event === 'SIGNED_OUT') {
          toast.info('Signed out');
        }
      }
    });

    return () => {
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
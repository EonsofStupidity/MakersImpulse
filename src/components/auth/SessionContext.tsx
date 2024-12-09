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
          if (error.message.includes('refresh_token_not_found')) {
            console.error('Refresh token not found, signing out');
            await supabase.auth.signOut();
            setSession(null);
            return;
          }
          throw error;
        }

        if (initialSession) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', initialSession.user.id)
            .single();

          setSession({
            user: {
              id: initialSession.user.id,
              email: initialSession.user.email,
              role: profile?.role || 'subscriber',
            },
            expires_at: initialSession.expires_at,
          });
          
          console.log('Session initialized with role:', profile?.role);
        }
      } catch (error) {
        console.error('Session initialization error:', error);
        toast.error('Error initializing session');
      } finally {
        setIsLoading(false);
      }
    };

    initializeSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      console.log('Auth state changed:', event);

      if (currentSession) {
        try {
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', currentSession.user.id)
            .single();

          setSession({
            user: {
              id: currentSession.user.id,
              email: currentSession.user.email,
              role: profile?.role || 'subscriber',
            },
            expires_at: currentSession.expires_at,
          });

          if (event === 'SIGNED_IN') {
            toast.success('Successfully signed in');
          }
        } catch (error) {
          console.error('Error updating session:', error);
          toast.error('Error updating session');
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
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
    let mounted = true;

    const transformSession = async (supabaseSession: Session | null): Promise<AuthSession | null> => {
      if (!supabaseSession) {
        console.log('No active session found');
        return null;
      }

      try {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('role, username, display_name')
          .eq('id', supabaseSession.user.id)
          .single();

        if (error) {
          console.error('Profile fetch error:', error);
          throw error;
        }

        return {
          user: {
            id: supabaseSession.user.id,
            email: supabaseSession.user.email,
            role: profile?.role || 'subscriber',
            username: profile?.username || supabaseSession.user.email?.split('@')[0],
            display_name: profile?.display_name || supabaseSession.user.email?.split('@')[0]
          },
          expires_at: supabaseSession.expires_at
        };
      } catch (error) {
        console.error('Error transforming session:', error);
        return null;
      }
    };

    const initializeSession = async () => {
      try {
        console.log('Initializing session...');
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        
        if (mounted) {
          const authSession = await transformSession(initialSession);
          console.log('Session initialized:', authSession ? 'Session exists' : 'No session');
          setSession(authSession);
        }
      } catch (error) {
        console.error('Session initialization error:', error);
        setSession(null);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    initializeSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      console.log('Auth state changed:', event, currentSession?.user?.id);
      
      if (mounted) {
        setIsLoading(true);
        try {
          const authSession = await transformSession(currentSession);
          setSession(authSession);
        } catch (error) {
          console.error('Auth state change error:', error);
          setSession(null);
        } finally {
          setIsLoading(false);
        }
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const contextValue = {
    session,
    isLoading
  };

  return (
    <SessionContext.Provider value={contextValue}>
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
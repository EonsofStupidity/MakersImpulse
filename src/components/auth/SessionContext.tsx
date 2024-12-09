import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AuthSession } from '@/integrations/supabase/types/auth';
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
    
    let mounted = true;

    const initializeSession = async () => {
      try {
        const { data: { session: initialSession }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Session initialization error:', error);
          throw error;
        }

        if (initialSession && mounted) {
          try {
            const { data: profile, error: profileError } = await supabase
              .from('profiles')
              .select('role, username, display_name')
              .eq('id', initialSession.user.id)
              .single();

            if (profileError) throw profileError;

            const enrichedSession: AuthSession = {
              user: {
                id: initialSession.user.id,
                email: initialSession.user.email,
                role: profile?.role || 'subscriber',
                username: profile?.username || initialSession.user.email?.split('@')[0],
                display_name: profile?.display_name || initialSession.user.email?.split('@')[0]
              },
              expires_at: initialSession.expires_at
            };

            setSession(enrichedSession);
          } catch (error) {
            console.error('Profile fetch error:', error);
            setSession(null);
          }
        }
      } catch (error) {
        console.error('Session initialization error:', error);
        toast.error('Failed to initialize session');
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    initializeSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      console.log('Auth state changed:', event, currentSession?.user?.id);
      
      if (currentSession && mounted) {
        try {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('role, username, display_name')
            .eq('id', currentSession.user.id)
            .single();

          if (profileError) throw profileError;

          const enrichedSession: AuthSession = {
            user: {
              id: currentSession.user.id,
              email: currentSession.user.email,
              role: profile?.role || 'subscriber',
              username: profile?.username || currentSession.user.email?.split('@')[0],
              display_name: profile?.display_name || currentSession.user.email?.split('@')[0]
            },
            expires_at: currentSession.expires_at
          };

          setSession(enrichedSession);
          setIsLoading(false);
        } catch (error) {
          console.error('Profile fetch error:', error);
          setSession(null);
          setIsLoading(false);
        }
      } else {
        if (mounted) {
          setSession(null);
          setIsLoading(false);
        }
      }
    });

    return () => {
      console.log('SessionProvider: Cleaning up...');
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
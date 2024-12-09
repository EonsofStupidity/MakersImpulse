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
    console.log('SessionProvider: Initializing...');
    
    // Get initial session
    supabase.auth.getSession().then(async ({ data: { session: initialSession }, error }) => {
      if (error) {
        console.error('Initial session error:', error);
        setSession(null);
        setIsLoading(false);
        return;
      }

      if (initialSession) {
        try {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('role, username, display_name')
            .eq('id', initialSession.user.id)
            .single();

          if (profileError) throw profileError;

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
        } catch (error) {
          console.error('Profile fetch error:', error);
          setSession(null);
        }
      }
      setIsLoading(false);
    });

    // Listen for auth changes
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

          setSession({
            user: {
              id: currentSession.user.id,
              email: currentSession.user.email,
              role: profile?.role || 'subscriber',
              username: profile?.username || currentSession.user.email?.split('@')[0],
              display_name: profile?.display_name || currentSession.user.email?.split('@')[0]
            },
            expires_at: currentSession.expires_at
          });
        } catch (error) {
          console.error('Profile fetch error:', error);
          setSession(null);
        }
      } else {
        setSession(null);
      }
      
      setIsLoading(false);
    });

    return () => {
      console.log('SessionProvider: Cleaning up...');
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
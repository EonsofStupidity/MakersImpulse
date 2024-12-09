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
    console.log('SessionProvider: Initializing');
    
    const initializeSession = async () => {
      try {
        const { data: { session: initialSession }, error } = await supabase.auth.getSession();
        
        if (error) throw error;

        if (initialSession) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('role, username, display_name')
            .eq('id', initialSession.user.id)
            .single();

          const sessionData = {
            user: {
              id: initialSession.user.id,
              email: initialSession.user.email,
              role: profile?.role || 'subscriber',
              username: profile?.username || initialSession.user.email?.split('@')[0],
              display_name: profile?.display_name || initialSession.user.email?.split('@')[0]
            },
            expires_at: initialSession.expires_at
          };

          setSession(sessionData);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Session initialization error:', error);
        setSession(null);
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
            .select('role, username, display_name')
            .eq('id', currentSession.user.id)
            .single();

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

          setSession(sessionData);

          if (event === 'SIGNED_IN') {
            toast.success(`Welcome back, ${sessionData.user.display_name}`);
          }
        } catch (error) {
          console.error('Error in auth state change:', error);
          setSession(null);
        }
      } else {
        setSession(null);
        if (event === 'SIGNED_OUT') {
          toast.success('Successfully signed out');
        }
      }
      
      setIsLoading(false);
    });

    return () => {
      console.log('SessionProvider: Cleaning up');
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
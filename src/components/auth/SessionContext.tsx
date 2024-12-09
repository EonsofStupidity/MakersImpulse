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
    let mounted = true;

    const transformSession = async (supabaseSession: Session | null): Promise<AuthSession | null> => {
      if (!supabaseSession) {
        console.log('SessionProvider: No Supabase session found');
        return null;
      }

      try {
        console.log('SessionProvider: Fetching profile for user:', supabaseSession.user.id);
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('role, username, display_name')
          .eq('id', supabaseSession.user.id)
          .single();

        if (error) {
          console.error('SessionProvider: Profile fetch error:', error);
          throw error;
        }

        console.log('SessionProvider: Profile data:', profile);

        const authSession: AuthSession = {
          user: {
            id: supabaseSession.user.id,
            email: supabaseSession.user.email,
            role: profile?.role || 'subscriber',
            username: profile?.username || supabaseSession.user.email?.split('@')[0],
            display_name: profile?.display_name || supabaseSession.user.email?.split('@')[0]
          },
          expires_at: supabaseSession.expires_at
        };

        console.log('SessionProvider: Transformed session:', authSession);
        return authSession;
      } catch (error) {
        console.error('SessionProvider: Error in transformSession:', error);
        toast.error('Error loading user profile');
        return null;
      }
    };

    const initializeSession = async () => {
      try {
        console.log('SessionProvider: Getting initial session');
        const { data: { session: initialSession }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('SessionProvider: Error getting initial session:', error);
          throw error;
        }

        console.log('SessionProvider: Initial session:', initialSession?.user?.id);
        
        if (mounted) {
          const authSession = await transformSession(initialSession);
          setSession(authSession);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('SessionProvider: Error in initializeSession:', error);
        if (mounted) {
          setSession(null);
          setIsLoading(false);
        }
      }
    };

    initializeSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      console.log('SessionProvider: Auth state changed:', event, currentSession?.user?.id);
      
      if (mounted) {
        try {
          const authSession = await transformSession(currentSession);
          setSession(authSession);
        } catch (error) {
          console.error('SessionProvider: Error handling auth state change:', error);
          setSession(null);
        } finally {
          setIsLoading(false);
        }
      }
    });

    return () => {
      console.log('SessionProvider: Cleaning up');
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const contextValue = {
    session,
    isLoading
  };

  console.log('SessionProvider: Rendering with state:', contextValue);
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
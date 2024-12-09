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
    console.log('SessionProvider mounted');
    
    const transformSession = async (supabaseSession: Session | null): Promise<AuthSession | null> => {
      if (!supabaseSession) {
        console.log('No Supabase session found');
        return null;
      }

      try {
        console.log('Fetching user profile for:', supabaseSession.user.id);
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('role, username, display_name')
          .eq('id', supabaseSession.user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
          throw error;
        }

        const authSession: AuthSession = {
          user: {
            id: supabaseSession.user.id,
            email: supabaseSession.user.email,
            role: profile?.role || 'subscriber',
            username: profile?.username,
            display_name: profile?.display_name
          },
          expires_at: supabaseSession.expires_at
        };

        console.log('Transformed session:', authSession);
        return authSession;
      } catch (error) {
        console.error('Error in transformSession:', error);
        toast.error('Error loading user profile');
        return null;
      }
    };

    // Initial session check
    const initializeSession = async () => {
      try {
        console.log('Checking initial session');
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        const authSession = await transformSession(initialSession);
        console.log('Initial auth session:', authSession);
        setSession(authSession);
      } catch (error) {
        console.error('Error initializing session:', error);
        toast.error('Error loading session');
      } finally {
        setIsLoading(false);
      }
    };

    initializeSession();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, supabaseSession) => {
      console.log('Auth state changed:', _event);
      const authSession = await transformSession(supabaseSession);
      console.log('New session state:', authSession);
      setSession(authSession);
    });

    return () => {
      console.log('Cleaning up auth subscription');
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
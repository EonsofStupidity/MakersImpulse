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

        console.log('Profile fetched:', profile);
        return {
          user: {
            id: supabaseSession.user.id,
            email: supabaseSession.user.email,
            role: profile?.role || 'subscriber',
            username: profile?.username,
            display_name: profile?.display_name
          },
          expires_at: supabaseSession.expires_at
        };
      } catch (error) {
        console.error('Error in transformSession:', error);
        toast.error('Error loading user profile');
        return null;
      }
    };

    const fetchSession = async () => {
      try {
        console.log('Fetching initial session');
        const { data: { session: supabaseSession } } = await supabase.auth.getSession();
        const authSession = await transformSession(supabaseSession);
        console.log('Initial session transformed:', authSession);
        setSession(authSession);
      } catch (error) {
        console.error('Error fetching session:', error);
        toast.error('Error loading session');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSession();

    const { data: subscription } = supabase.auth.onAuthStateChange(async (_event, supabaseSession) => {
      console.log('Auth state changed:', _event);
      const authSession = await transformSession(supabaseSession);
      console.log('New session state:', authSession);
      setSession(authSession);
    });

    return () => {
      subscription.subscription.unsubscribe();
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
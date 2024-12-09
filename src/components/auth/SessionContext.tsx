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
      if (!supabaseSession) return null;

      try {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', supabaseSession.user.id)
          .single();

        if (error) throw error;

        return {
          user: {
            id: supabaseSession.user.id,
            email: supabaseSession.user.email,
            role: profile?.role || 'subscriber'
          },
          expires_at: supabaseSession.expires_at
        };
      } catch (error) {
        console.error('Error fetching user profile:', error);
        toast.error('Error loading user profile');
        return null;
      }
    };

    const fetchSession = async () => {
      try {
        const { data: { session: supabaseSession } } = await supabase.auth.getSession();
        const authSession = await transformSession(supabaseSession);
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
      const authSession = await transformSession(supabaseSession);
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
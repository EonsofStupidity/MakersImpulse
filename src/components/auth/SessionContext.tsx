import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AuthSession } from '@/integrations/supabase/types/auth';
import { Session } from '@supabase/supabase-js';

interface SessionContextType {
  session: AuthSession | null;
}

export const SessionContext = createContext<SessionContextType | null>(null);

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<AuthSession | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session: supabaseSession } } = await supabase.auth.getSession();
      if (supabaseSession) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', supabaseSession.user.id)
          .single();

        const authSession: AuthSession = {
          user: {
            id: supabaseSession.user.id,
            email: supabaseSession.user.email,
            role: profile?.role || 'subscriber'
          },
          expires_at: supabaseSession.expires_at
        };
        setSession(authSession);
      }
    };

    fetchSession();

    const { data } = supabase.auth.onAuthStateChange(async (_event, supabaseSession) => {
      if (supabaseSession) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', supabaseSession.user.id)
          .single();

        const authSession: AuthSession = {
          user: {
            id: supabaseSession.user.id,
            email: supabaseSession.user.email,
            role: profile?.role || 'subscriber'
          },
          expires_at: supabaseSession.expires_at
        };
        setSession(authSession);
      } else {
        setSession(null);
      }
    });

    return () => {
      data?.subscription.unsubscribe();
    };
  }, []);

  return (
    <SessionContext.Provider value={{ session }}>
      {children}
    </SessionContext.Provider>
  );
};
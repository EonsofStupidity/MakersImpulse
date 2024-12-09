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
          console.error('Profile fetch error:', error);
          throw error;
        }

        if (!profile) {
          console.log('No profile found, creating default profile');
          return {
            user: {
              id: supabaseSession.user.id,
              email: supabaseSession.user.email,
              role: 'subscriber',
              username: supabaseSession.user.email?.split('@')[0],
              display_name: supabaseSession.user.email?.split('@')[0]
            },
            expires_at: supabaseSession.expires_at
          };
        }

        const authSession: AuthSession = {
          user: {
            id: supabaseSession.user.id,
            email: supabaseSession.user.email,
            role: profile.role || 'subscriber',
            username: profile.username,
            display_name: profile.display_name
          },
          expires_at: supabaseSession.expires_at
        };

        return authSession;
      } catch (error) {
        console.error('Error in transformSession:', error);
        toast.error('Error loading user profile');
        return null;
      }
    };

    const initializeSession = async () => {
      try {
        const { data: { session: initialSession }, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        if (mounted) {
          const authSession = await transformSession(initialSession);
          setSession(authSession);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error initializing session:', error);
        if (mounted) {
          setSession(null);
          setIsLoading(false);
          toast.error('Error initializing session');
        }
      }
    };

    initializeSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, supabaseSession) => {
      console.log('Auth state changed:', event);
      
      if (mounted) {
        try {
          if (event === 'SIGNED_IN') {
            const authSession = await transformSession(supabaseSession);
            setSession(authSession);
          } else if (event === 'SIGNED_OUT') {
            setSession(null);
          }
        } catch (error) {
          console.error('Error handling auth state change:', error);
          toast.error('Error updating session');
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
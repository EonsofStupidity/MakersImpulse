import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Session } from '@supabase/supabase-js';
import type { AuthSession } from './types';

interface SessionContextType {
  session: AuthSession | null;
  isLoading: boolean;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

const convertSession = (session: Session | null): AuthSession | null => {
  if (!session) return null;
  return {
    user: {
      id: session.user.id,
      email: session.user.email,
      role: (session.user.user_metadata?.role as AuthSession['user']['role']) || 'subscriber',
    },
    expires_at: session.expires_at,
  };
};

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const initializeSession = async () => {
      try {
        console.log('SessionProvider: Initializing session...');
        const { data: { session: initialSession }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Session initialization error:', error);
          throw error;
        }

        if (mounted) {
          if (initialSession?.user) {
            console.log('Initial session found:', initialSession.user.id);
            const convertedSession = convertSession(initialSession);
            
            try {
              const { data: profile, error: profileError } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', initialSession.user.id)
                .single();

              if (profileError) {
                console.error('Profile fetch error:', profileError);
              } else if (profile && convertedSession) {
                convertedSession.user.role = profile.role;
                console.log('User role set from profile:', profile.role);
              }

              setSession(convertedSession);
            } catch (profileError) {
              console.error('Profile fetch failed:', profileError);
              setSession(convertedSession);
            }
          } else {
            console.log('No active session');
            setSession(null);
          }
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Session initialization failed:', error);
        if (mounted) {
          setSession(null);
          setIsLoading(false);
        }
      }
    };

    initializeSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      console.log('Auth state changed:', event);

      if (mounted) {
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          if (currentSession?.user) {
            const convertedSession = convertSession(currentSession);
            
            try {
              const { data: profile, error: profileError } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', currentSession.user.id)
                .single();

              if (profileError) {
                console.error('Profile fetch error:', profileError);
              } else if (profile && convertedSession) {
                convertedSession.user.role = profile.role;
                console.log('Updated user role:', profile.role);
              }

              setSession(convertedSession);
              toast.success('Successfully signed in');
            } catch (error) {
              console.error('Profile update failed:', error);
              setSession(convertedSession);
            }
          }
        } else if (event === 'SIGNED_OUT') {
          console.log('User signed out');
          setSession(null);
          toast.info('Signed out');
        }
        setIsLoading(false);
      }
    });

    return () => {
      console.log('Cleaning up session subscription');
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const value = {
    session,
    isLoading
  };

  return (
    <SessionContext.Provider value={value}>
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
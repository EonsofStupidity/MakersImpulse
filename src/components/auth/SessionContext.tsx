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
    console.log('SessionProvider: Starting initialization');
    
    let mounted = true;

    const initializeSession = async () => {
      try {
        const { data: { session: initialSession }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Session initialization error:', error);
          if (error.message.includes('refresh_token_not_found')) {
            await supabase.auth.signOut();
          }
          throw error;
        }

        if (mounted) {
          const convertedSession = convertSession(initialSession);
          console.log('Session initialization result:', {
            hasSession: !!convertedSession,
            userId: convertedSession?.user?.id
          });
          
          if (convertedSession?.user?.id) {
            // Fetch profile data including role
            const { data: profile, error: profileError } = await supabase
              .from('profiles')
              .select('role')
              .eq('id', convertedSession.user.id)
              .single();

            if (profileError) {
              console.error('Profile fetch error:', profileError);
            } else if (profile) {
              convertedSession.user.role = profile.role;
              console.log('Profile role fetched:', profile.role);
            }
          }

          setSession(convertedSession);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Session initialization error:', error);
        if (mounted) {
          setSession(null);
          setIsLoading(false);
          toast.error('Failed to initialize session');
        }
      }
    };

    initializeSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      console.log('Auth state changed:', event, currentSession?.user?.id);

      if (mounted) {
        if (event === 'TOKEN_REFRESHED' || event === 'SIGNED_IN') {
          const convertedSession = convertSession(currentSession);
          
          if (convertedSession?.user?.id) {
            // Fetch profile data including role
            const { data: profile, error: profileError } = await supabase
              .from('profiles')
              .select('role')
              .eq('id', convertedSession.user.id)
              .single();

            if (profileError) {
              console.error('Profile fetch error:', profileError);
            } else if (profile) {
              convertedSession.user.role = profile.role;
              console.log('Profile role updated:', profile.role);
            }
          }

          setSession(convertedSession);
          console.log('Session updated:', {
            hasSession: !!convertedSession,
            userId: convertedSession?.user?.id,
            role: convertedSession?.user?.role
          });
        } else if (event === 'SIGNED_OUT') {
          console.log('User signed out, clearing session');
          setSession(null);
        }
        setIsLoading(false);
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
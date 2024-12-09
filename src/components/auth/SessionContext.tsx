import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { AuthSession } from './types';

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

    const initializeSession = async () => {
      try {
        console.log('Initializing session...');
        setIsLoading(true);

        const { data: { session: initialSession }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          throw error;
        }

        if (initialSession && mounted) {
          console.log('Found initial session for user:', initialSession.user.id);
          
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', initialSession.user.id)
            .single();

          if (profileError) {
            console.error('Error fetching profile:', profileError);
            throw profileError;
          }

          const sessionData: AuthSession = {
            user: {
              id: initialSession.user.id,
              email: initialSession.user.email,
              role: profile?.role || 'subscriber',
            },
            expires_at: initialSession.expires_at,
          };

          console.log('Setting session with data:', sessionData);
          setSession(sessionData);
        } else {
          console.log('No initial session found');
          setSession(null);
        }
      } catch (error) {
        console.error('Session initialization error:', error);
        toast.error('Error initializing session');
        setSession(null);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    // Initialize session
    initializeSession();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      if (!mounted) return;

      console.log('Auth state changed:', event, currentSession?.user?.id);

      try {
        if (currentSession) {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', currentSession.user.id)
            .single();

          if (profileError) throw profileError;

          const sessionData: AuthSession = {
            user: {
              id: currentSession.user.id,
              email: currentSession.user.email,
              role: profile?.role || 'subscriber',
            },
            expires_at: currentSession.expires_at,
          };

          console.log('Updating session with new data:', sessionData);
          setSession(sessionData);

          if (event === 'SIGNED_IN') {
            toast.success('Successfully signed in');
          }
        } else {
          console.log('Clearing session state');
          setSession(null);
          
          if (event === 'SIGNED_OUT') {
            toast.info('Signed out');
          }
        }
      } catch (error) {
        console.error('Error handling auth state change:', error);
        toast.error('Error updating session');
        setSession(null);
      }
    });

    return () => {
      console.log('Cleaning up session provider');
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
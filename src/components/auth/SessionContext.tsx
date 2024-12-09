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

    const transformSession = async (supabaseSession: Session | null): Promise<AuthSession | null> => {
      if (!supabaseSession) {
        console.log('No active session found');
        return null;
      }

      try {
        console.log('Fetching profile for user:', supabaseSession.user.id);
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('role, username, display_name')
          .eq('id', supabaseSession.user.id)
          .single();

        if (error) {
          console.error('Profile fetch error:', error);
          throw error;
        }

        console.log('Profile fetched successfully:', profile);
        return {
          user: {
            id: supabaseSession.user.id,
            email: supabaseSession.user.email,
            role: profile?.role || 'subscriber',
            username: profile?.username || supabaseSession.user.email?.split('@')[0],
            display_name: profile?.display_name || supabaseSession.user.email?.split('@')[0]
          },
          expires_at: supabaseSession.expires_at
        };
      } catch (error) {
        console.error('Error transforming session:', error);
        toast.error('Error loading user profile');
        return null;
      }
    };

    const initializeSession = async () => {
      try {
        console.log('Starting session initialization...');
        const { data: { session: initialSession }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Session initialization error:', error);
          throw error;
        }

        if (mounted) {
          console.log('Processing initial session...');
          const authSession = await transformSession(initialSession);
          console.log('Session transformation complete:', authSession ? 'Valid session' : 'No session');
          setSession(authSession);
        }
      } catch (error) {
        console.error('Session initialization failed:', error);
        setSession(null);
        toast.error('Failed to initialize session');
      } finally {
        if (mounted) {
          setIsLoading(false);
          console.log('Session initialization complete');
        }
      }
    };

    initializeSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      console.log('Auth state changed:', event, currentSession?.user?.id);
      
      if (mounted) {
        setIsLoading(true);
        try {
          const authSession = await transformSession(currentSession);
          console.log('Session updated after auth change:', authSession ? 'Valid' : 'Invalid');
          setSession(authSession);
        } catch (error) {
          console.error('Auth state change error:', error);
          setSession(null);
          toast.error('Session update failed');
        } finally {
          setIsLoading(false);
        }
      }
    });

    return () => {
      console.log('Cleaning up session provider');
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
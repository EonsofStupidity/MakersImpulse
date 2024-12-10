import { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuthStore } from '../store/auth-store';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { setSession, setUser, reset } = useAuthStore();
  const [localSession, setLocalSession] = useState<Session | null>(null);

  useEffect(() => {
    let mounted = true;
    console.log('AuthProvider: Initializing');

    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting initial session:', error);
          throw error;
        }

        if (!mounted) return;

        console.log('Initial session check:', session ? 'Found session' : 'No session');
        
        if (session?.user) {
          try {
            const { data: profile, error: profileError } = await supabase
              .from('profiles')
              .select('role')
              .eq('id', session.user.id)
              .single();

            if (!mounted) return;

            if (profileError) {
              console.error('Error loading user profile:', profileError);
              throw profileError;
            }

            if (profile) {
              session.user.role = profile.role;
              console.log('Loaded user role:', profile.role);
            }
            
            setLocalSession(session);
            setSession(session);
            setUser(session.user);
          } catch (error) {
            console.error('Error loading user profile:', error);
            if (mounted) {
              toast.error('Error loading user profile');
            }
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        if (mounted) {
          toast.error('Error initializing authentication');
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    const subscription = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log('Auth state changed:', event, currentSession?.user?.id);
        
        if (!mounted) return;

        if (currentSession?.user) {
          try {
            const { data: profile, error: profileError } = await supabase
              .from('profiles')
              .select('role')
              .eq('id', currentSession.user.id)
              .single();

            if (!mounted) return;

            if (profileError) {
              console.error('Error updating session:', profileError);
              throw profileError;
            }

            if (profile) {
              currentSession.user.role = profile.role;
              console.log('Updated session with role:', profile.role);
            }
            
            setLocalSession(currentSession);
            setSession(currentSession);
            setUser(currentSession.user);
          } catch (error) {
            console.error('Error updating session:', error);
            if (mounted) {
              toast.error('Error updating session');
            }
          }
        } else {
          setLocalSession(null);
          reset();
        }
        
        if (mounted) {
          setIsLoading(false);
        }
      }
    );

    initializeAuth();

    return () => {
      console.log('AuthProvider cleanup');
      mounted = false;
      subscription.data.subscription.unsubscribe();
    };
  }, [setSession, setUser, reset]);

  const signOut = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setLocalSession(null);
      reset();
      toast.success("Successfully signed out");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Error signing out");
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    session: localSession,
    user: localSession?.user ?? null,
    isLoading,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
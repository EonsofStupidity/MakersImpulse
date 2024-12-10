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
    console.log('AuthProvider: Initializing');
    let mounted = true;

    // Get initial session
    supabase.auth.getSession().then(async ({ data: { session: initialSession } }) => {
      console.log('Initial session check:', initialSession ? 'Found session' : 'No session');
      
      if (mounted && initialSession?.user) {
        try {
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', initialSession.user.id)
            .single();

          if (profile) {
            initialSession.user.role = profile.role;
            console.log('Loaded user role:', profile.role);
          }
          
          setLocalSession(initialSession);
          setSession(initialSession);
          setUser(initialSession.user);
        } catch (error) {
          console.error('Error loading user profile:', error);
        }
      }
      if (mounted) setIsLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log('Auth state changed:', event, currentSession?.user?.id);

        if (currentSession?.user && mounted) {
          try {
            const { data: profile } = await supabase
              .from('profiles')
              .select('role')
              .eq('id', currentSession.user.id)
              .single();

            if (profile) {
              currentSession.user.role = profile.role;
              console.log('Updated session with role:', profile.role);
            }
            
            setLocalSession(currentSession);
            setSession(currentSession);
            setUser(currentSession.user);
          } catch (error) {
            console.error('Error updating session:', error);
          }
        } else if (mounted) {
          setLocalSession(null);
          reset();
        }
        
        if (mounted) setIsLoading(false);
      }
    );

    return () => {
      console.log('AuthProvider cleanup');
      mounted = false;
      subscription.unsubscribe();
    };
  }, [setSession, setUser, reset]);

  const signOut = async () => {
    try {
      setIsLoading(true);
      await supabase.auth.signOut();
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
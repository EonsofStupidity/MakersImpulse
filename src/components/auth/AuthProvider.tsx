import { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    console.log("AuthProvider: Initializing...");
    
    const fetchUserProfile = async (userId: string) => {
      try {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', userId)
          .single();

        if (error) {
          console.error('Error fetching user profile:', error);
          return null;
        }

        return profile;
      } catch (error) {
        console.error('Error in fetchUserProfile:', error);
        return null;
      }
    };

    // Get initial session
    const initializeAuth = async () => {
      try {
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        console.log("Initial session:", initialSession?.user?.id);
        
        if (initialSession?.user && mounted) {
          const profile = await fetchUserProfile(initialSession.user.id);
          if (profile) {
            initialSession.user.role = profile.role;
          }
          setSession(initialSession);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.id);
      
      if (session?.user && mounted) {
        try {
          const profile = await fetchUserProfile(session.user.id);
          if (profile) {
            session.user.role = profile.role;
          }
          setSession(session);
        } catch (error) {
          console.error("Error handling auth state change:", error);
        }
      } else if (mounted) {
        setSession(null);
      }
      
      if (mounted) {
        setIsLoading(false);
      }
    });

    return () => {
      console.log("AuthProvider: Cleaning up subscription");
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Successfully signed out");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Error signing out");
    }
  };

  const value = {
    session,
    user: session?.user ?? null,
    isLoading,
    signOut,
  };

  console.log("AuthProvider render:", { 
    hasSession: !!session,
    userId: session?.user?.id,
    userRole: session?.user?.role,
    isLoading 
  });

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
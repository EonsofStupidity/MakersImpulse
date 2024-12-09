import { createContext, useContext, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuthStore } from '@/lib/store/auth-store';
import { useCacheStore } from '@/lib/store/cache-store';

interface AuthContextType {
  session: any | null;
  user: any | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();
  const { setSession, setUser, setLoading, reset } = useAuthStore();
  const { clearCache } = useCacheStore();

  // Fetch user profile data when session exists
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      console.log('Fetching profile...');
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return null;

      const { data, error } = await supabase
        .from('profiles')
        .select('role, username, display_name')
        .eq('id', session.user.id)
        .single();

      if (error) throw error;
      console.log('Profile fetched:', data);
      return data;
    },
    enabled: !!queryClient.getQueryData(['session']),
    staleTime: 5 * 60 * 1000,
    retry: false
  });

  // Get and sync session
  const { data: session, isLoading } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      try {
        console.log('Fetching session...');
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Session fetch error:', error);
          if (error.message.includes('refresh_token_not_found')) {
            console.log('Refresh token not found, signing out...');
            await supabase.auth.signOut();
            queryClient.clear();
            return null;
          }
          throw error;
        }

        if (!session) {
          console.log('No session found');
          return null;
        }

        console.log('Session found:', session.user.id);
        return session;
      } catch (error) {
        console.error('Session error:', error);
        await supabase.auth.signOut();
        queryClient.clear();
        return null;
      }
    },
    retry: false,
    staleTime: 5 * 60 * 1000
  });

  // Subscribe to auth changes
  useEffect(() => {
    console.log('Setting up auth subscription');
    
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.id);
      
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        setSession(session);
        queryClient.invalidateQueries({ queryKey: ['profile'] });
        console.log('User signed in:', session?.user?.id);
      }
      
      if (event === 'SIGNED_OUT') {
        reset();
        clearCache();
        queryClient.clear();
        toast.info('Signed out');
      }
    });

    return () => {
      console.log('Cleaning up auth subscription');
      subscription.unsubscribe();
    };
  }, [queryClient, setSession, reset, clearCache]);

  // Update loading state
  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  // Update user state when profile changes
  useEffect(() => {
    if (session && profile) {
      setUser({
        id: session.user.id,
        email: session.user.email,
        role: profile.role || 'subscriber',
        username: profile.username,
        displayName: profile.display_name,
      });
    } else if (!session) {
      setUser(null);
    }
  }, [session, profile, setUser]);

  const contextValue = {
    session,
    user: useAuthStore((state) => state.user),
    isLoading: useAuthStore((state) => state.isLoading)
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
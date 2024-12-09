import { createContext, useContext, useEffect, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { Session } from '@supabase/supabase-js';
import type { AuthUser } from './types';

interface AuthContextType {
  session: Session | null;
  user: AuthUser | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();

  // Fetch user profile data when session exists
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return null;

      const { data, error } = await supabase
        .from('profiles')
        .select('role, username, display_name')
        .eq('id', session.user.id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!queryClient.getQueryData(['session']),
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    retry: false
  });

  // Get and sync session
  const { data: session, isLoading } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          if (error.message.includes('refresh_token_not_found')) {
            console.log('Refresh token not found, signing out');
            await supabase.auth.signOut();
            return null;
          }
          throw error;
        }
        return session;
      } catch (error) {
        console.error('Session fetch error:', error);
        await supabase.auth.signOut();
        return null;
      }
    },
    retry: false,
    staleTime: 5 * 60 * 1000 // Cache for 5 minutes
  });

  // Subscribe to auth changes
  useEffect(() => {
    console.log('Setting up auth subscription');
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.id);
      queryClient.setQueryData(['session'], session);

      if (event === 'SIGNED_IN') {
        toast.success('Successfully signed in');
        queryClient.invalidateQueries({ queryKey: ['profile'] });
      } else if (event === 'SIGNED_OUT') {
        queryClient.clear();
        toast.info('Signed out');
      } else if (event === 'TOKEN_REFRESHED') {
        console.log('Token refreshed successfully');
        queryClient.invalidateQueries({ queryKey: ['profile'] });
      }
    });

    return () => {
      console.log('Cleaning up auth subscription');
      subscription.unsubscribe();
    };
  }, [queryClient]);

  // Memoize the user object to prevent unnecessary re-renders
  const user: AuthUser | null = useMemo(() => {
    if (!session) return null;
    return {
      id: session.user.id,
      email: session.user.email,
      role: profile?.role || 'subscriber',
      username: profile?.username,
      displayName: profile?.display_name,
    };
  }, [session, profile]);

  // Memoize the context value
  const contextValue = useMemo(() => ({
    session,
    user,
    isLoading
  }), [session, user, isLoading]);

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
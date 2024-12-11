import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, AuthUser, AuthSession } from '@/lib/auth/types/auth';
import { supabase } from "@/integrations/supabase/client";
import { sessionManager } from '@/lib/auth/SessionManager';
import { securityManager } from '@/lib/auth/SecurityManager';
import { authLogger } from '@/lib/auth/AuthLogger';

interface AuthStore extends AuthState {
  setSession: (session: AuthSession | null) => void;
  setUser: (user: AuthUser | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
  setOffline: (isOffline: boolean) => void;
  signOut: () => Promise<void>;
  reset: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      session: null,
      user: null,
      isLoading: true,
      error: null,
      isOffline: !navigator.onLine,
      setSession: (session) => {
        authLogger.info('Setting session', { userId: session?.user?.id });
        set({ session });
      },
      setUser: (user) => {
        authLogger.info('Setting user', { userId: user?.id });
        set({ user });
      },
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => {
        if (error) {
          authLogger.error('Auth error occurred', error);
        }
        set({ error });
      },
      setOffline: (isOffline) => set({ isOffline }),
      signOut: async () => {
        try {
          authLogger.info('Signing out user', { userId: get().user?.id });
          set({ isLoading: true, error: null });
          
          await sessionManager.handleSignOut();
          securityManager.clearSecurityData();
          
          set({ session: null, user: null });
        } catch (error) {
          const authError = error instanceof Error ? error : new Error('Sign out failed');
          authLogger.error('Sign out error', authError);
          set({ error: authError });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
      reset: () => {
        authLogger.info('Resetting auth store');
        set({ 
          session: null, 
          user: null, 
          isLoading: false, 
          error: null 
        });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        session: state.session,
        user: state.user 
      }),
    }
  )
);

// Set up online/offline listeners
if (typeof window !== 'undefined') {
  window.addEventListener('online', () => {
    useAuthStore.getState().setOffline(false);
    authLogger.info('Application is online');
  });
  
  window.addEventListener('offline', () => {
    useAuthStore.getState().setOffline(true);
    authLogger.warn('Application is offline');
  });
}
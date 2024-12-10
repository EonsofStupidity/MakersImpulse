import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Session } from '@supabase/supabase-js';
import type { UserRole } from '@/components/auth/types';
import { supabase } from "@/integrations/supabase/client";
import { storeSessionLocally } from '@/utils/auth/offlineAuth';

interface AuthState {
  session: Session | null;
  user: {
    id: string;
    email?: string | null;
    role?: UserRole;
    username?: string;
    displayName?: string;
  } | null;
  isLoading: boolean;
  error: Error | null;
  isOffline: boolean;
  setSession: (session: Session | null) => void;
  setUser: (user: any | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
  setOffline: (isOffline: boolean) => void;
  signOut: () => Promise<void>;
  reset: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      session: null,
      user: null,
      isLoading: true,
      error: null,
      isOffline: !navigator.onLine,
      setSession: (session) => set({ session }),
      setUser: (user) => set({ user }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      setOffline: (isOffline) => set({ isOffline }),
      signOut: async () => {
        try {
          set({ isLoading: true, error: null });
          await supabase.auth.signOut();
          storeSessionLocally(null);
          set({ session: null, user: null });
        } catch (error) {
          set({ error: error instanceof Error ? error : new Error('Sign out failed') });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
      reset: () => set({ 
        session: null, 
        user: null, 
        isLoading: false, 
        error: null 
      }),
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
  });
  
  window.addEventListener('offline', () => {
    useAuthStore.getState().setOffline(true);
  });
}
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Session } from '@supabase/supabase-js';
import type { UserRole } from '@/components/auth/types';
import { supabase } from "@/integrations/supabase/client";

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
  setSession: (session: Session | null) => void;
  setUser: (user: any | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
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
      setSession: (session) => set({ session }),
      setUser: (user) => set({ user }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      signOut: async () => {
        try {
          set({ isLoading: true, error: null });
          await supabase.auth.signOut();
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
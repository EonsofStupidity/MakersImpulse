import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserRole } from '@/integrations/supabase/types/auth';

interface AuthState {
  session: any | null;
  user: {
    id: string;
    email?: string | null;
    role?: UserRole;
    username?: string;
    displayName?: string;
  } | null;
  isLoading: boolean;
  setSession: (session: any | null) => void;
  setUser: (user: any | null) => void;
  setLoading: (isLoading: boolean) => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      session: null,
      user: null,
      isLoading: true,
      setSession: (session) => set({ session }),
      setUser: (user) => set({ user }),
      setLoading: (isLoading) => set({ isLoading }),
      reset: () => set({ session: null, user: null, isLoading: false }),
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
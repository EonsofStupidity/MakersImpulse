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
  setSession: (session: Session | null) => void;
  setUser: (user: any | null) => void;
  setLoading: (isLoading: boolean) => void;
  signOut: () => Promise<void>;
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
      signOut: async () => {
        await supabase.auth.signOut();
        set({ session: null, user: null });
      },
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
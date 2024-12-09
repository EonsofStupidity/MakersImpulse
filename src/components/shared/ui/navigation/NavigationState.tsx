import { create } from 'zustand';
import { AuthSession } from '@/integrations/supabase/types/auth';

interface NavigationState {
  isScrolled: boolean;
  mousePosition: { x: number; y: number };
  setIsScrolled: (value: boolean) => void;
  setMousePosition: (position: { x: number; y: number }) => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  isScrolled: false,
  mousePosition: { x: 0, y: 0 },
  setIsScrolled: (value) => set({ isScrolled: value }),
  setMousePosition: (position) => set({ mousePosition: position }),
}));
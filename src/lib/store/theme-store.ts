import { create } from "zustand";
import { ThemeBase } from "@/types/theme/core/types";
import { useSettings } from "@/hooks/useSettings";

interface ThemeStore {
  theme: ThemeBase | null;
  isLoading: boolean;
  updateTheme: (theme: Partial<ThemeBase>) => void;
  resetTheme: () => void;
}

export const useThemeStore = create<ThemeStore>((set) => {
  const { setting, updateSetting } = useSettings("theme", "base");

  return {
    theme: setting?.value as ThemeBase || null,
    isLoading: false,
    updateTheme: async (updates) => {
      set({ isLoading: true });
      await updateSetting(updates);
      set({ isLoading: false });
    },
    resetTheme: () => {
      console.log("Reset theme to default");
    }
  };
});
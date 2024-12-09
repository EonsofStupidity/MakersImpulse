import { createContext, useContext, useEffect } from "react";
import { ThemeContextType } from "../types/theme";
import { useThemeSettings } from "../hooks/useThemeSettings";
import { useThemeSubscription } from "../hooks/useThemeSubscription";

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme, setTheme, fetchSettings } = useThemeSettings();

  useEffect(() => {
    console.log("ThemeProvider: Initializing...");
    fetchSettings();
  }, [fetchSettings]);

  // Subscribe to real-time theme updates
  useThemeSubscription(setTheme);

  if (!theme) {
    console.log("ThemeProvider: Theme not loaded yet");
    return null; // Or a loading spinner
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
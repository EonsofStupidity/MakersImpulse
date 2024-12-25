import { ThemeBase } from '@/types';
import { useEffect } from 'react';

export const useThemeSubscription = (themeId: string, onThemeChange: (theme: ThemeBase) => void) => {
  useEffect(() => {
    const fetchTheme = async () => {
      // Fetch the theme based on the themeId
      const response = await fetch(`/api/themes/${themeId}`);
      const theme: ThemeBase = await response.json();
      onThemeChange(theme);
    };

    fetchTheme();

    // Optionally, you can set up a subscription to listen for theme changes
    const subscription = subscribeToThemeChanges(themeId, onThemeChange);

    return () => {
      subscription.unsubscribe();
    };
  }, [themeId, onThemeChange]);
};

const subscribeToThemeChanges = (themeId: string, callback: (theme: ThemeBase) => void) => {
  // Mock subscription logic
  const interval = setInterval(async () => {
    const response = await fetch(`/api/themes/${themeId}`);
    const theme: ThemeBase = await response.json();
    callback(theme);
  }, 5000); // Check for changes every 5 seconds

  return {
    unsubscribe: () => clearInterval(interval),
  };
};

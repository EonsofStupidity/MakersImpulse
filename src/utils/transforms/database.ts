import { ThemeBase, ThemeState } from '@/types';

export const transformThemeData = (theme: ThemeBase): ThemeState => {
  return {
    ...theme,
    isDirty: false,
    lastSync: null,
    syncStatus: 'idle',
    syncError: undefined,
    isLoading: false,
    error: null
  };
};

// Function to validate theme data
export const validateThemeData = (theme: ThemeBase): boolean => {
  // Add validation logic here
  return true; // Placeholder for actual validation
};

// Function to convert theme state to a format suitable for storage
export const convertThemeStateForStorage = (state: ThemeState): ThemeBase => {
  const { isDirty, lastSync, syncStatus, syncError, ...themeData } = state;
  return themeData;
};

// Function to merge two theme objects
export const mergeThemes = (baseTheme: ThemeBase, newTheme: ThemeBase): ThemeBase => {
  return {
    ...baseTheme,
    ...newTheme,
    colors: {
      ...baseTheme.colors,
      ...newTheme.colors,
    },
    typography: {
      ...baseTheme.typography,
      ...newTheme.typography,
    },
    effects: {
      ...baseTheme.effects,
      ...newTheme.effects,
    },
    spacing: {
      ...baseTheme.spacing,
      ...newTheme.spacing,
    },
    animations: {
      ...baseTheme.animations,
      ...newTheme.animations,
    },
  };
};

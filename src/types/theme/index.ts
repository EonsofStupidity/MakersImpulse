// Core types with clear separation of concerns
export * from './core/types';
export * from './core/form';
export * from './schema';

// Clean exports for backward compatibility
export type { 
  ThemeBase,
  ThemeFormData,
  Settings,
  SettingsFormData
} from './core/form';

export type {
  ThemeFormState
} from './core/types';
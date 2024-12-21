// Core types with clear separation of concerns
export * from './core/types';
export * from './core/form';
export * from './schema';

// Clean exports for backward compatibility
export type { 
  ThemeBase,
  ThemeFormData,
  Settings,
  SettingsResponse,
  PreviewPreferences,
  GlassEffectLevel,
  ThemeMode,
  ThemeComponentType,
  TransitionType,
  ThemeInheritanceStrategy,
  ThemeFormState
} from './core/types';
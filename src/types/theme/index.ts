// Core types with clear separation of concerns
export * from './core/types';
export * from './schema';

// Clean exports for backward compatibility
export type { Theme, ThemeFormData, Settings, TransitionType, ThemeInheritanceStrategy } from './core/types';
// Core types with clear separation of concerns
export * from './core/types';
export * from './core/form';
export * from './core/base';
export * from './core/database';
export * from './core/context';
export * from './schema';

// Clean exports for backward compatibility
export type { ThemeBase } from './core/base';
export type { SettingsFormData } from './core/form';
export type { ThemeContextType } from './core/context';
export type { DatabaseSettingsRow } from './core/database';
export type { Settings } from './core/types';
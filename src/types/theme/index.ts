// Core types
export * from './core/base';
export * from './core/colors';
export * from './core/context';
export * from './core/database';
export * from './core/effects';
export * from './core/form';
export * from './core/typography';
export * from './core/types';
export * from './core/ui';

// Settings specific types
export * from './settings/database';
export * from './settings/context';

/**
 * @deprecated Use specific imports from core/ or settings/ instead
 */
export interface Theme extends ThemeBase {}

/**
 * @deprecated Use SettingsFormData from core/form instead
 */
export type { SettingsFormData } from './core/form';

/**
 * @deprecated Use DatabaseSettings from settings/database instead
 */
export type { DatabaseSettings } from './settings/database';
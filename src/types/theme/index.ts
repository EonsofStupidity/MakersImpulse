// Core types with clear separation of concerns
export * from './core/base';        // ThemeBase, DEFAULT_BASE_PROPERTIES
export * from './core/colors';      // ThemeColors, TextColors, NeonColors
export * from './core/context';     // ThemeContextState, SettingsContextState
export * from './core/database';    // RawSiteSettingsRow, DbSiteSettingsInsert, DbSiteSettingsUpdate
export * from './core/effects';     // TransitionConfig, ShadowConfig, ThemeEffects
export * from './core/form';        // SettingsFormData, ThemeFormState
export * from './core/typography';  // FontFamilyConfig, FontWeightConfig, ThemeTypography
export * from './core/types';       // ThemeMode, ThemeComponentType, TransitionType
export * from './core/ui';          // UITheme, UIThemeColors, UIThemeTypography, UIThemeEffects

// Settings specific exports
export * from './settings/database';  // DatabaseSettings
export * from './settings/context';   // ThemeContextType

// Clean exports for backward compatibility
export type { ThemeBase } from './core/base';
export type { SettingsFormData } from './core/form';
export type { DatabaseSettings } from './settings/database';
export type { Settings, SettingsResponse } from './types';
export * from './types';
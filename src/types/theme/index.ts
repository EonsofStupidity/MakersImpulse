// Core exports with clear naming
export * from './core/database';
export * from './core/form';
export * from './core/ui';
export * from './core/context';

// Basic shared types
export type ThemeMode = 'light' | 'dark' | 'system';
export type ThemeComponentType = 'color' | 'typography' | 'layout' | 'animation' | 'effect';
export type TransitionType = 'fade' | 'slide' | 'scale' | 'blur';
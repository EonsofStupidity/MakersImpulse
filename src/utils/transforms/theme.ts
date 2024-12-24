import { ThemeBase } from '@/types/theme/core/types';

export const applyThemeToDocument = (theme: ThemeBase): void => {
  const root = document.documentElement;
  
  // Colors
  root.style.setProperty('--primary', theme.colors.primary);
  root.style.setProperty('--secondary', theme.colors.secondary);
  root.style.setProperty('--accent', theme.colors.accent);
  root.style.setProperty('--text-primary', theme.colors.text.primary);
  root.style.setProperty('--text-secondary', theme.colors.text.secondary);
  root.style.setProperty('--text-link', theme.colors.text.link);
  root.style.setProperty('--text-heading', theme.colors.text.heading);
  root.style.setProperty('--neon-cyan', theme.colors.neon.cyan);
  root.style.setProperty('--neon-pink', theme.colors.neon.pink);
  root.style.setProperty('--neon-purple', theme.colors.neon.purple);

  // Typography
  root.style.setProperty('--font-family-heading', theme.typography.fontFamily.heading);
  root.style.setProperty('--font-family-body', theme.typography.fontFamily.body);
  root.style.setProperty('--font-size-base', theme.typography.fontSize);
  root.style.setProperty('--font-weight-normal', theme.typography.fontWeight.normal);
  root.style.setProperty('--font-weight-bold', theme.typography.fontWeight.bold);
  root.style.setProperty('--line-height-base', theme.typography.lineHeight);
  root.style.setProperty('--letter-spacing', theme.typography.letterSpacing);

  // Spacing
  root.style.setProperty('--border-radius', theme.spacing.borderRadius);
  root.style.setProperty('--spacing-unit', theme.spacing.unit);

  // Effects
  root.style.setProperty('--transition-duration', theme.effects.transition.duration);
  root.style.setProperty('--shadow-color', theme.effects.shadow.color);
  root.style.setProperty('--box-shadow', theme.effects.shadow.boxShadow);
  root.style.setProperty('--hover-scale', theme.effects.hover.scale);
  root.style.setProperty('--backdrop-blur', theme.effects.backdrop.blur);

  console.log('Applied theme to document:', theme);
};
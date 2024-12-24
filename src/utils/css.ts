import { ThemeStyles } from '@/types';

export const generateCSSVariables = (styles: ThemeStyles) => {
  return Object.entries(styles).map(([key, value]) => {
    return `--${key}: ${value};`;
  }).join('\n');
};

export const applyThemeStyles = (styles: ThemeStyles) => {
  const root = document.documentElement;
  const cssVariables = generateCSSVariables(styles);
  root.style.cssText += cssVariables;
};

export const resetThemeStyles = () => {
  const root = document.documentElement;
  root.style.cssText = '';
};

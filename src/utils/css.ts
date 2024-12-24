import { CSSUnit, CSSValue } from '@/types/theme/core/types';

export const cssUnits: CSSUnit[] = ['px', 'rem', 'em', 'vh', 'vw', '%', ''];

export const formatCSSValue = (value: string | number, defaultUnit: CSSUnit = 'px'): CSSValue => {
  if (typeof value === 'number') {
    return `${value}${defaultUnit}`;
  }
  
  // If it's already a valid CSS value with a unit, return as is
  if (cssUnits.some(unit => value.endsWith(unit))) {
    return value;
  }
  
  // Otherwise, append the default unit
  return `${value}${defaultUnit}`;
};

export const parseCSSValue = (value: CSSValue): { value: number; unit: CSSUnit } => {
  const match = value.match(/^([-\d.]+)(.*)$/);
  if (!match) {
    return { value: 0, unit: '' };
  }
  
  const [, numStr, unit] = match;
  return {
    value: parseFloat(numStr),
    unit: (unit || '') as CSSUnit
  };
};

export const convertToNumber = (value: CSSValue): number => {
  const { value: num } = parseCSSValue(value);
  return num;
};

export const convertToString = (value: number | string, defaultUnit: CSSUnit = 'px'): CSSValue => {
  return formatCSSValue(value, defaultUnit);
};

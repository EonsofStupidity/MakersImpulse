import { CSSUnit, CSSValue } from '@/types/theme/core/types';

export const cssUnits: CSSUnit[] = ['px', 'rem', 'em', 'vh', 'vw', '%', ''];

export const formatCSSValue = (value: string | number, defaultUnit: CSSUnit = 'px'): CSSValue => {
  if (typeof value === 'number') {
    return `${value}${defaultUnit}`;
  }
  
  if (cssUnits.some(unit => value.endsWith(unit))) {
    return value as CSSValue;
  }
  
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

export const convertToString = (value: number | string, defaultUnit: CSSUnit = 'px'): string => {
  return formatCSSValue(value, defaultUnit);
};
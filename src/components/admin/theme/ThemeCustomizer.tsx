import React from 'react';
import { ThemeSettingsForm } from './components/ThemeSettingsForm';
import { themeSchema } from '@/types/theme/schema';

export const ThemeCustomizer = () => {
  return <ThemeSettingsForm />;
};

export { ThemeSettingsForm };
import React from 'react';
import { ThemeSettingsForm } from '@/components/admin/theme/ThemeSettingsForm';
import { themeSchema } from '@/types/theme/schema';

export const ThemeCustomizer = () => {
  return <ThemeSettingsForm schema={themeSchema} />;
};
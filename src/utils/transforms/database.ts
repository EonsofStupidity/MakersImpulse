import { ThemeRow, ThemeConfigurationRow } from '@/types/database/theme';
import { ThemeState } from '@/types/state/theme';

export const transformDatabaseToState = (row: ThemeRow): ThemeState => {
  return {
    ...row,
    isDirty: false,
    lastSync: row.last_sync ? new Date(row.last_sync) : null,
    syncStatus: 'idle',
    isPreviewMode: false,
    localChanges: {}
  };
};

export const validateDatabaseState = (state: Partial<ThemeState>): boolean => {
  // Add validation logic here
  return true;
};
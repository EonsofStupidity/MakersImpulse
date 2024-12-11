import type { Change } from 'diff';

export type DiffType = 'chars' | 'words';

export interface DiffChange extends Change {
  value: string;
  added?: boolean;
  removed?: boolean;
}

export interface DiffViewerProps {
  oldContent: string;
  newContent: string;
  oldMetadata?: Record<string, any>;
  newMetadata?: Record<string, any>;
}

export interface DiffNavigationState {
  currentIndex: number;
  totalChanges: number;
  type: DiffType;
}
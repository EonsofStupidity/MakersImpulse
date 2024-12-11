import type { Change } from 'diff';

export type DiffType = 'chars' | 'words';

export interface DiffChange extends Omit<Change, 'added' | 'removed'> {
  value: string;
  added?: boolean;
  removed?: boolean;
  count?: number;
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

export interface DiffMetadata {
  version: number;
  timestamp: string;
  author?: string;
  summary?: string;
}
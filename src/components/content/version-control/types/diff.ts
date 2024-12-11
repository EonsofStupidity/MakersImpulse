import type { Change } from 'diff';

export type DiffViewMode = 'unified' | 'split';
export type DiffHighlightMode = 'char' | 'word' | 'line';

export interface DiffSearchMatch {
  lineNumber: number;
  matchStart: number;
  matchEnd: number;
  content: string;
}

// Extend Change interface properly with required properties
export interface DiffChange extends Omit<Change, 'added' | 'removed'> {
  value: string;
  added: boolean;
  removed: boolean;
  count?: number;
  lineNumber?: number;
}

export interface DiffStatistics {
  additions: number;
  deletions: number;
  changes: number;
  totalLines: number;
}

export interface DiffSearchState {
  query: string;
  matches: DiffSearchMatch[];
  currentMatchIndex: number;
  isSearching: boolean;
}

export interface DiffNavigationState {
  currentIndex: number;
  totalChanges: number;
  type: DiffHighlightMode;
}

export interface DiffViewerProps {
  oldContent: string;
  newContent: string;
  oldMetadata?: Record<string, any>;
  newMetadata?: Record<string, any>;
  viewMode?: DiffViewMode;
  highlightMode?: DiffHighlightMode;
  onNavigate?: (index: number) => void;
  className?: string;
}

export interface DiffSectionProps {
  content: DiffChange[];
  type: 'old' | 'new';
  searchState?: DiffSearchState;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

export interface DiffMetadataProps {
  metadata: Record<string, any>;
  statistics: DiffStatistics;
  className?: string;
}

export interface DiffControlsProps {
  navigation: DiffNavigationState;
  viewMode: DiffViewMode;
  highlightMode: DiffHighlightMode;
  searchState: DiffSearchState;
  onNavigate: (direction: 'prev' | 'next') => void;
  onViewModeChange: (mode: DiffViewMode) => void;
  onHighlightModeChange: (mode: DiffHighlightMode) => void;
  onSearch: (query: string) => void;
}

export interface DiffContextValue {
  navigation: DiffNavigationState;
  searchState: DiffSearchState;
  viewMode: DiffViewMode;
  highlightMode: DiffHighlightMode;
  setNavigation: (state: DiffNavigationState) => void;
  setSearchState: (state: DiffSearchState) => void;
  setViewMode: (mode: DiffViewMode) => void;
  setHighlightMode: (mode: DiffHighlightMode) => void;
}
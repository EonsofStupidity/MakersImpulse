import type { Change } from 'diff';

// Core types for diff functionality
export type DiffHighlightMode = 'char' | 'word' | 'line';
export type DiffViewMode = 'unified' | 'split';
export type DiffSearchMode = 'simple' | 'regex' | 'fuzzy';

// Statistics and metadata
export interface DiffStatistics {
  additions: number;
  deletions: number;
  changes: number;
  totalLines: number;
  changedFiles?: number;
}

export interface DiffMetadata {
  author?: {
    name: string;
    email?: string;
    avatar?: string;
  };
  timestamp: string;
  commitHash?: string;
  branch?: string;
  fileInfo?: {
    path: string;
    size: number;
    mode: string;
  };
}

// Search functionality
export interface DiffSearchMatch {
  lineNumber: number;
  matchStart: number;
  matchEnd: number;
  content: string;
}

export interface DiffSearchState {
  query: string;
  matches: DiffSearchMatch[];
  currentMatchIndex: number;
  isSearching: boolean;
  mode: DiffSearchMode;
  caseSensitive: boolean;
}

// Navigation state
export interface DiffNavigationState {
  currentIndex: number;
  totalChanges: number;
  type: DiffHighlightMode;
}

// Section management
export interface DiffSection {
  id: string;
  startLine: number;
  endLine: number;
  type: 'addition' | 'deletion' | 'modification' | 'context';
  isExpanded: boolean;
  content: string[];
}

// Enhanced diff change type
export interface DiffChange extends Omit<Change, 'added' | 'removed'> {
  value: string;
  added: boolean;
  removed: boolean;
  lineNumber?: number;
  section?: DiffSection;
}

// Component Props
export interface DiffViewerProps {
  oldContent: string;
  newContent: string;
  oldMetadata?: DiffMetadata;
  newMetadata?: DiffMetadata;
  viewMode?: DiffViewMode;
  highlightMode?: DiffHighlightMode;
  onNavigate?: (index: number) => void;
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
  onToggleCase: () => void;
  onToggleRegex: () => void;
}

export interface DiffSectionProps {
  content: DiffChange[];
  type: 'old' | 'new';
  searchState?: DiffSearchState;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

export interface DiffMetadataProps {
  metadata: DiffMetadata;
  statistics: DiffStatistics;
  className?: string;
}

// Context types
export interface DiffContextValue {
  navigation: DiffNavigationState;
  searchState: DiffSearchState;
  viewMode: DiffViewMode;
  highlightMode: DiffHighlightMode;
  sections: Map<string, DiffSection>;
  setNavigation: (state: DiffNavigationState) => void;
  setSearchState: (state: DiffSearchState) => void;
  setViewMode: (mode: DiffViewMode) => void;
  setHighlightMode: (mode: DiffHighlightMode) => void;
  setSections: (sections: Map<string, DiffSection>) => void;
  toggleSection: (sectionId: string) => void;
  toggleAllSections: (expanded: boolean) => void;
}

// Accessibility types
export interface DiffAccessibilityConfig {
  ariaLabels: {
    viewer: string;
    controls: string;
    search: string;
    navigation: string;
    section: string;
  };
  keyboardShortcuts: {
    nextDiff: string[];
    prevDiff: string[];
    toggleSearch: string[];
    expandAll: string[];
    collapseAll: string[];
    closeSearch: string[];
  };
}

// Performance optimization types
export interface DiffChunk {
  id: string;
  changes: DiffChange[];
  isVisible: boolean;
  height: number;
}

export interface VirtualizationConfig {
  itemHeight: number;
  overscan: number;
  chunkSize: number;
}

// Test utility types
export interface DiffTestCase {
  name: string;
  oldContent: string;
  newContent: string;
  expectedChanges: number;
  expectedAdditions: number;
  expectedDeletions: number;
}

export interface PerformanceMetrics {
  computationTime: number;
  renderTime: number;
  memoryUsage: number;
  chunkProcessingTime: number;
}
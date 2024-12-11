import React, { createContext, useContext, useState } from 'react';
import type { 
  DiffContextValue, 
  DiffNavigationState, 
  DiffSearchState, 
  DiffViewMode, 
  DiffHighlightMode 
} from '../types/diff';

const DiffContext = createContext<DiffContextValue | undefined>(undefined);

export const useDiffContext = () => {
  const context = useContext(DiffContext);
  if (!context) {
    throw new Error('useDiffContext must be used within a DiffProvider');
  }
  return context;
};

interface DiffProviderProps {
  children: React.ReactNode;
}

export const DiffProvider: React.FC<DiffProviderProps> = ({ children }) => {
  const [navigation, setNavigation] = useState<DiffNavigationState>({
    currentIndex: 0,
    totalChanges: 0,
    type: 'word'
  });

  const [searchState, setSearchState] = useState<DiffSearchState>({
    query: '',
    matches: [],
    currentMatchIndex: 0,
    isSearching: false
  });

  const [viewMode, setViewMode] = useState<DiffViewMode>('split');
  const [highlightMode, setHighlightMode] = useState<DiffHighlightMode>('word');

  const value: DiffContextValue = {
    navigation,
    searchState,
    viewMode,
    highlightMode,
    setNavigation,
    setSearchState,
    setViewMode,
    setHighlightMode
  };

  return (
    <DiffContext.Provider value={value}>
      {children}
    </DiffContext.Provider>
  );
};
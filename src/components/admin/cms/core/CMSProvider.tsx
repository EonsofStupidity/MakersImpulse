import React, { createContext, useContext, useState } from 'react';
import { useContentQueries } from './hooks/useContentQueries';
import { useContentMutations } from './hooks/useContentMutations';
import { useRealtimeSubscriptions } from './hooks/useRealtimeSubscriptions';
import { CMSErrorBoundary } from './CMSErrorBoundary';
import type { CMSContent } from './types';

interface CMSContextType {
  // Content Management
  activeContent: CMSContent | null;
  setActiveContent: (content: CMSContent | null) => void;
  
  // Data and Loading States
  components: ReturnType<typeof useContentQueries>['components'];
  workflows: ReturnType<typeof useContentQueries>['workflows'];
  categories: ReturnType<typeof useContentQueries>['categories'];
  tags: ReturnType<typeof useContentQueries>['tags'];
  isLoading: boolean;
  
  // Mutations
  createContent: ReturnType<typeof useContentMutations>['createContent']['mutate'];
  updateContent: ReturnType<typeof useContentMutations>['updateContent']['mutate'];
  deleteContent: ReturnType<typeof useContentMutations>['deleteContent']['mutate'];
  
  // Metadata
  lastUpdated?: string;
}

const CMSContext = createContext<CMSContextType | null>(null);

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};

export const CMSProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeContent, setActiveContent] = useState<CMSContent | null>(null);
  
  // Set up queries
  const { components, workflows, categories, tags, isLoading } = useContentQueries();
  
  // Set up mutations
  const { createContent, updateContent, deleteContent } = useContentMutations();
  
  // Set up realtime subscriptions
  useRealtimeSubscriptions();

  return (
    <CMSErrorBoundary>
      <CMSContext.Provider 
        value={{ 
          activeContent, 
          setActiveContent,
          components,
          workflows,
          categories,
          tags,
          isLoading,
          createContent: createContent.mutate,
          updateContent: updateContent.mutate,
          deleteContent: deleteContent.mutate,
          lastUpdated: new Date().toISOString()
        }}
      >
        {children}
      </CMSContext.Provider>
    </CMSErrorBoundary>
  );
};
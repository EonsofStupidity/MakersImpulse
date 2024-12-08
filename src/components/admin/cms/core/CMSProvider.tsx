import React, { createContext, useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { 
  CMSContent, 
  CMSComponent, 
  CMSWorkflow,
  CMSCategory,
  CMSTag 
} from './types';

interface CMSContextType {
  // Content Management
  activeContent: CMSContent | null;
  setActiveContent: (content: CMSContent | null) => void;
  
  // Components Registry
  components: CMSComponent[];
  
  // Workflows
  workflows: CMSWorkflow[];
  
  // Categories & Tags
  categories: CMSCategory[];
  tags: CMSTag[];
  
  // Loading States
  isLoading: boolean;
  
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

  // Fetch Components
  const { data: components = [], isLoading: componentsLoading } = useQuery({
    queryKey: ['cms-components'],
    queryFn: async () => {
      console.log('Fetching CMS components...');
      const { data, error } = await supabase
        .from('cms_components')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error fetching components:', error);
        toast.error('Failed to load components');
        throw error;
      }

      return data;
    },
  });

  // Fetch Workflows
  const { data: workflows = [], isLoading: workflowsLoading } = useQuery({
    queryKey: ['cms-workflows'],
    queryFn: async () => {
      console.log('Fetching CMS workflows...');
      const { data, error } = await supabase
        .from('cms_workflows')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error fetching workflows:', error);
        toast.error('Failed to load workflows');
        throw error;
      }

      return data;
    },
  });

  // Fetch Categories
  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ['cms-categories'],
    queryFn: async () => {
      console.log('Fetching CMS categories...');
      const { data, error } = await supabase
        .from('cms_categories')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error fetching categories:', error);
        toast.error('Failed to load categories');
        throw error;
      }

      return data;
    },
  });

  // Fetch Tags
  const { data: tags = [], isLoading: tagsLoading } = useQuery({
    queryKey: ['cms-tags'],
    queryFn: async () => {
      console.log('Fetching CMS tags...');
      const { data, error } = await supabase
        .from('cms_tags')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error fetching tags:', error);
        toast.error('Failed to load tags');
        throw error;
      }

      return data;
    },
  });

  const isLoading = componentsLoading || workflowsLoading || categoriesLoading || tagsLoading;

  return (
    <CMSContext.Provider 
      value={{ 
        activeContent, 
        setActiveContent, 
        components, 
        workflows,
        categories,
        tags,
        isLoading,
        lastUpdated: new Date().toISOString()
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};
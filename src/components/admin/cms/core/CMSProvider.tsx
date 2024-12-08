import React, { createContext, useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { CMSContent, CMSComponent, CMSWorkflow } from './types';

interface CMSContextType {
  activeContent: CMSContent | null;
  setActiveContent: (content: CMSContent | null) => void;
  components: CMSComponent[];
  workflows: CMSWorkflow[];
  isLoading: boolean;
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

  const isLoading = componentsLoading || workflowsLoading;

  return (
    <CMSContext.Provider 
      value={{ 
        activeContent, 
        setActiveContent, 
        components, 
        workflows,
        isLoading 
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};
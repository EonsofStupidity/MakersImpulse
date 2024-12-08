import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { CMSContent, CMSComponent, CMSWorkflow, CMSCategory, CMSTag } from '../types';

export const useContentQueries = () => {
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

      return data as CMSComponent[];
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

      return data as CMSWorkflow[];
    },
  });

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

      return data as CMSCategory[];
    },
  });

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

      return data as CMSTag[];
    },
  });

  return {
    components,
    workflows,
    categories,
    tags,
    isLoading: componentsLoading || workflowsLoading || categoriesLoading || tagsLoading,
  };
};
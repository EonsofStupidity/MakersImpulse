import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { CMSContent } from '../types';

export const useContentMutations = () => {
  const queryClient = useQueryClient();

  const createContent = useMutation({
    mutationFn: async (content: Omit<CMSContent, 'id' | 'created_at' | 'updated_at'>) => {
      console.log('Creating content:', content);
      const { data, error } = await supabase
        .from('cms_content')
        .insert(content)
        .select()
        .single();

      if (error) {
        console.error('Error creating content:', error);
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cms-content'] });
      toast.success('Content created successfully');
    },
    onError: (error) => {
      toast.error('Failed to create content');
      console.error('Create content error:', error);
    },
  });

  const updateContent = useMutation({
    mutationFn: async (content: Partial<CMSContent> & { id: string }) => {
      console.log('Updating content:', content);
      const { data, error } = await supabase
        .from('cms_content')
        .update(content)
        .eq('id', content.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating content:', error);
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cms-content'] });
      toast.success('Content updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update content');
      console.error('Update content error:', error);
    },
  });

  const deleteContent = useMutation({
    mutationFn: async (id: string) => {
      console.log('Deleting content:', id);
      const { error } = await supabase
        .from('cms_content')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting content:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cms-content'] });
      toast.success('Content deleted successfully');
    },
    onError: (error) => {
      toast.error('Failed to delete content');
      console.error('Delete content error:', error);
    },
  });

  return {
    createContent,
    updateContent,
    deleteContent,
  };
};
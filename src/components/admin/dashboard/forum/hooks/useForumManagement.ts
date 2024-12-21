import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ForumThread, NewThread } from '@/types/forum';

export const useForumManagement = () => {
  const queryClient = useQueryClient();

  const { data: threads, isLoading } = useQuery({
    queryKey: ['forum-threads'],
    queryFn: async () => {
      console.log('Fetching forum threads...');
      const { data, error } = await supabase
        .from('forum_threads')
        .select(`
          *,
          author:profiles(display_name),
          replies:forum_replies(count),
          flags:forum_flags(count)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching threads:', error);
        toast.error('Failed to load forum threads');
        throw error;
      }

      return data as ForumThread[];
    }
  });

  const deleteThreadMutation = useMutation({
    mutationFn: async (threadId: string) => {
      const { error } = await supabase
        .from('forum_threads')
        .delete()
        .eq('id', threadId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forum-threads'] });
      toast.success('Thread deleted successfully');
    },
    onError: (error) => {
      console.error('Error deleting thread:', error);
      toast.error('Failed to delete thread');
    }
  });

  const createThreadMutation = useMutation({
    mutationFn: async (threadData: NewThread) => {
      const { data, error } = await supabase
        .from('forum_threads')
        .insert([
          {
            title: threadData.title,
            content: threadData.content,
            author_id: (await supabase.auth.getUser()).data.user?.id
          }
        ])
        .select();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forum-threads'] });
      toast.success('Thread created successfully');
    },
    onError: (error) => {
      console.error('Error creating thread:', error);
      toast.error('Failed to create thread');
    }
  });

  return {
    threads,
    isLoading,
    deleteThread: deleteThreadMutation.mutate,
    createThread: createThreadMutation.mutate,
    isCreating: createThreadMutation.isPending,
    isDeleting: deleteThreadMutation.isPending
  };
};
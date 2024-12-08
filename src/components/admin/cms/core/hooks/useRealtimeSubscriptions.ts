import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useRealtimeSubscriptions = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    console.log('Setting up realtime subscriptions...');
    
    const channel = supabase
      .channel('cms-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'cms_content'
        },
        (payload) => {
          console.log('Content change received:', payload);
          queryClient.invalidateQueries({ queryKey: ['cms-content'] });
          
          const eventMessages = {
            INSERT: 'New content created',
            UPDATE: 'Content updated',
            DELETE: 'Content deleted'
          };
          
          toast.info(eventMessages[payload.eventType] || 'Content changed');
        }
      )
      .subscribe();

    return () => {
      console.log('Cleaning up realtime subscriptions...');
      channel.unsubscribe();
    };
  }, [queryClient]);
};
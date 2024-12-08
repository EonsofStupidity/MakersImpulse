import { useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from "@/components/ui/use-toast";

export const useERDSubscription = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  useEffect(() => {
    const channel = supabase.channel('erd_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
        },
        (payload) => {
          queryClient.invalidateQueries({ queryKey: ['enhanced-schema-info'] });
          
          toast({
            title: "Schema Updated",
            description: "The database schema has been modified",
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient, toast]);
};
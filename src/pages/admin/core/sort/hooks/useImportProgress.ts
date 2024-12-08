import { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

export const useImportProgress = (importId: string | null) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<'pending' | 'processing' | 'completed' | 'failed'>('pending');
  const { toast } = useToast();

  useEffect(() => {
    if (!importId) return;

    // Subscribe to real-time updates
    const channel = supabase
      .channel(`import-${importId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'import_sessions',
          filter: `id=eq.${importId}`,
        },
        (payload) => {
          const { processed_count, row_count, status: newStatus } = payload.new;
          
          if (row_count) {
            const newProgress = Math.round((processed_count / row_count) * 100);
            setProgress(newProgress);
          }
          
          setStatus(newStatus);

          if (newStatus === 'completed') {
            toast({
              title: 'Import Completed',
              description: 'Your data has been successfully imported.',
            });
          } else if (newStatus === 'failed') {
            toast({
              title: 'Import Failed',
              description: 'There was an error processing your import.',
              variant: 'destructive',
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [importId, toast]);

  return { progress, status };
};
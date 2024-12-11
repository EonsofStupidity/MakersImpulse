import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

interface QueueItem {
  id: string;
  content_id: string;
  scheduled_for: string;
  status: string;
  created_at: string;
  error_message?: string;
}

export const QueueProcessor: React.FC = () => {
  const { data: queueItems, isLoading } = useQuery({
    queryKey: ['publishing-queue'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('publishing_queue')
        .select('*')
        .order('scheduled_for', { ascending: true });

      if (error) throw error;
      return data as QueueItem[];
    },
    refetchInterval: 30000 // Refetch every 30 seconds
  });

  useEffect(() => {
    const processQueue = async () => {
      const now = new Date();
      const itemsToProcess = queueItems?.filter(
        item => new Date(item.scheduled_for) <= now && item.status === 'pending'
      );

      if (itemsToProcess?.length) {
        for (const item of itemsToProcess) {
          try {
            // Update content status to published
            await supabase
              .from('cms_content')
              .update({ status: 'published' })
              .eq('id', item.content_id);

            // Update queue item status
            await supabase
              .from('publishing_queue')
              .update({ 
                status: 'completed',
                processed_at: new Date().toISOString()
              })
              .eq('id', item.id);

            toast.success(`Content ${item.content_id} published successfully`);
          } catch (error) {
            console.error('Error processing queue item:', error);
            await supabase
              .from('publishing_queue')
              .update({ 
                status: 'failed',
                error_message: (error as Error).message
              })
              .eq('id', item.id);

            toast.error(`Failed to publish content ${item.content_id}`);
          }
        }
      }
    };

    const interval = setInterval(processQueue, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [queueItems]);

  if (isLoading) return null;

  return (
    <Card className="p-4 bg-black/40 backdrop-blur-xl border-white/10">
      <h3 className="text-lg font-semibold mb-4 text-white">Publishing Queue</h3>
      <div className="space-y-3">
        {queueItems?.map((item) => (
          <div 
            key={item.id}
            className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
          >
            <div>
              <p className="text-sm text-white/70">
                Scheduled for: {format(new Date(item.scheduled_for), 'PPp')}
              </p>
              {item.error_message && (
                <p className="text-sm text-red-400 mt-1">{item.error_message}</p>
              )}
            </div>
            <Badge
              variant={
                item.status === 'completed' ? 'secondary' :
                item.status === 'failed' ? 'destructive' :
                'default'
              }
            >
              {item.status}
            </Badge>
          </div>
        ))}
      </div>
    </Card>
  );
};
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Archive } from 'lucide-react';
import { toast } from 'sonner';
import { useCMS } from '../core/CMSProvider';
import type { CMSContent } from '../core/types';

export const ContentList = () => {
  const { setActiveContent } = useCMS();

  const { data: content = [], isLoading } = useQuery({
    queryKey: ['cms-content'],
    queryFn: async () => {
      console.log('Fetching CMS content...');
      const { data, error } = await supabase
        .from('cms_content')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) {
        console.error('Error fetching content:', error);
        toast.error('Failed to load content');
        throw error;
      }

      return data as CMSContent[];
    },
  });

  const getStatusColor = (status: CMSContent['status']) => {
    switch (status) {
      case 'published':
        return 'bg-green-500/10 text-green-500';
      case 'draft':
        return 'bg-yellow-500/10 text-yellow-500';
      case 'archived':
        return 'bg-gray-500/10 text-gray-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-4 h-24" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Content</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Content
        </Button>
      </div>

      <div className="grid gap-4">
        {content.map((item) => (
          <Card key={item.id} className="p-4 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-sm text-muted-foreground">
                  Last updated: {new Date(item.updated_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(item.status)}>
                  {item.status}
                </Badge>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setActiveContent(item)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => {
                    toast.promise(
                      supabase
                        .from('cms_content')
                        .update({ status: 'archived' })
                        .eq('id', item.id),
                      {
                        loading: 'Archiving...',
                        success: 'Content archived',
                        error: 'Failed to archive'
                      }
                    );
                  }}
                >
                  <Archive className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useCMS } from '../core/CMSProvider';
import type { CMSContent } from '../core/types';
import { ContentListHeader } from './list/ContentListHeader';
import { ContentListItem } from './list/ContentListItem';

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

  const handleNewContent = () => {
    setActiveContent({
      id: '',
      type: 'page',
      title: '',
      content: {},
      metadata: {},
      status: 'draft',
      version: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 bg-muted rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <ContentListHeader onNewContent={handleNewContent} />
      <div className="grid gap-4">
        {content.map((item) => (
          <ContentListItem
            key={item.id}
            item={item}
            onEdit={setActiveContent}
          />
        ))}
      </div>
    </div>
  );
};
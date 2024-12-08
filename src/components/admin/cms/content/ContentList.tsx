import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useCMS } from '../core/CMSProvider';
import type { CMSContent } from '../core/types';
import { ContentListHeader } from './list/ContentListHeader';
import { ContentListItem } from './list/ContentListItem';
import { ContentEditor } from './editor/ContentEditor';
import { ContentFilters } from './filters/ContentFilters';

export const ContentList = () => {
  const { activeContent, setActiveContent } = useCMS();
  const [searchQuery, setSearchQuery] = useState('');
  const [contentType, setContentType] = useState('all');
  const [status, setStatus] = useState('all');

  const { data: content = [], isLoading } = useQuery({
    queryKey: ['cms-content', searchQuery, contentType, status],
    queryFn: async () => {
      console.log('Fetching CMS content with filters:', { searchQuery, contentType, status });
      let query = supabase
        .from('cms_content')
        .select('*')
        .order('updated_at', { ascending: false });

      // Apply filters
      if (searchQuery) {
        query = query.ilike('title', `%${searchQuery}%`);
      }
      if (contentType !== 'all') {
        query = query.eq('type', contentType);
      }
      if (status !== 'all') {
        query = query.eq('status', status);
      }

      const { data, error } = await query;

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

  if (activeContent) {
    return <ContentEditor />;
  }

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
      <ContentFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        contentType={contentType}
        onContentTypeChange={setContentType}
        status={status}
        onStatusChange={setStatus}
      />
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
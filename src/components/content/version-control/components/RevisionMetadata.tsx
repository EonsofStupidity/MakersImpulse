import React from 'react';
import { format } from 'date-fns';
import type { ContentRevision } from '@/integrations/supabase/types/content';

interface RevisionMetadataProps {
  revision: ContentRevision;
}

export const RevisionMetadata: React.FC<RevisionMetadataProps> = ({ revision }) => {
  return (
    <div className="text-sm text-muted-foreground">
      <p>Created by: {revision.profiles?.display_name || 'Unknown'}</p>
      <p>Date: {format(new Date(revision.createdAt), 'PPpp')}</p>
      {revision.changeSummary && (
        <p className="mt-2">Summary: {revision.changeSummary}</p>
      )}
    </div>
  );
};
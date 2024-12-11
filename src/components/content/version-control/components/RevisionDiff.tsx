import React from 'react';
import { DiffViewer } from './DiffViewer';
import type { RevisionMetadata } from '@/integrations/supabase/types/content';

interface RevisionDiffProps {
  oldContent: string;
  newContent: string;
  oldMetadata?: RevisionMetadata;
  newMetadata?: RevisionMetadata;
}

export const RevisionDiff: React.FC<RevisionDiffProps> = ({
  oldContent,
  newContent,
  oldMetadata,
  newMetadata
}) => {
  return (
    <DiffViewer
      oldContent={oldContent}
      newContent={newContent}
      oldMetadata={oldMetadata}
      newMetadata={newMetadata}
    />
  );
};
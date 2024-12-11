import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { VersionSelector } from './components/VersionSelector';
import { RevisionContent } from './components/RevisionContent';
import type { ContentRevision } from '@/integrations/supabase/types/content';

interface RevisionCompareProps {
  contentId: string;
  currentVersion?: number;
}

export const RevisionCompare: React.FC<RevisionCompareProps> = ({
  contentId,
  currentVersion
}) => {
  const [selectedVersions, setSelectedVersions] = useState<{
    left: number;
    right: number;
  }>({
    left: currentVersion ? currentVersion - 1 : 1,
    right: currentVersion || 1
  });

  const { data: revisions, isLoading } = useQuery({
    queryKey: ['content-revisions', contentId],
    queryFn: async () => {
      console.log('Fetching revisions for comparison:', contentId);
      
      const { data, error } = await supabase
        .from('cms_content_revisions')
        .select(`
          id,
          content_id,
          content,
          metadata,
          created_at,
          created_by,
          version_number,
          change_summary,
          profiles (
            display_name
          )
        `)
        .eq('content_id', contentId)
        .order('version_number', { ascending: false });

      if (error) {
        console.error('Error fetching revisions:', error);
        toast.error('Failed to load revisions');
        throw error;
      }

      return data.map(revision => ({
        id: revision.id,
        contentId: revision.content_id,
        content: revision.content,
        metadata: revision.metadata,
        createdAt: revision.created_at,
        createdBy: revision.created_by,
        versionNumber: revision.version_number,
        changeSummary: revision.change_summary,
        profiles: revision.profiles
      })) as ContentRevision[];
    },
    enabled: !!contentId,
  });

  const getSelectedRevisions = () => {
    if (!revisions) return { left: null, right: null };
    
    const left = revisions.find(r => r.versionNumber === selectedVersions.left);
    const right = revisions.find(r => r.versionNumber === selectedVersions.right);
    
    return { left, right };
  };

  const handleVersionChange = (direction: 'left' | 'right', increment: boolean) => {
    if (!revisions?.length) return;

    const currentValue = selectedVersions[direction];
    const newValue = increment ? currentValue + 1 : currentValue - 1;
    
    if (newValue >= 1 && newValue <= revisions.length) {
      setSelectedVersions(prev => ({
        ...prev,
        [direction]: newValue
      }));
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!revisions?.length) {
    return (
      <div className="text-center p-4 text-muted-foreground">
        No revision history available
      </div>
    );
  }

  const { left, right } = getSelectedRevisions();

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Left Version */}
      <Card className="p-4 bg-background/50 backdrop-blur-sm border-primary/20">
        <VersionSelector
          versionNumber={selectedVersions.left}
          maxVersion={revisions.length}
          onVersionChange={(increment) => handleVersionChange('left', increment)}
        />
        <RevisionContent revision={left} />
      </Card>

      {/* Right Version */}
      <Card className="p-4 bg-background/50 backdrop-blur-sm border-primary/20">
        <VersionSelector
          versionNumber={selectedVersions.right}
          maxVersion={revisions.length}
          onVersionChange={(increment) => handleVersionChange('right', increment)}
        />
        <RevisionContent revision={right} />
      </Card>
    </div>
  );
};
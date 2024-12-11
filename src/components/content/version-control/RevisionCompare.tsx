import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, History } from 'lucide-react';
import { toast } from 'sonner';
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

  const { left, right } = getSelectedRevisions();

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

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Left Version */}
      <Card className="p-4 bg-background/50 backdrop-blur-sm border-primary/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Version {selectedVersions.left}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleVersionChange('left', false)}
              disabled={selectedVersions.left <= 1}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleVersionChange('left', true)}
              disabled={selectedVersions.left >= (revisions?.length || 0)}
            >
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <ScrollArea className="h-[600px]">
          {left && (
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                <p>Created by: {left.profiles?.display_name || 'Unknown'}</p>
                <p>Date: {format(new Date(left.createdAt), 'PPpp')}</p>
                {left.changeSummary && (
                  <p className="mt-2">Summary: {left.changeSummary}</p>
                )}
              </div>
              <pre className="bg-background/50 p-4 rounded-lg overflow-x-auto text-sm">
                {JSON.stringify(left.content, null, 2)}
              </pre>
            </div>
          )}
        </ScrollArea>
      </Card>

      {/* Right Version */}
      <Card className="p-4 bg-background/50 backdrop-blur-sm border-primary/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Version {selectedVersions.right}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleVersionChange('right', false)}
              disabled={selectedVersions.right <= 1}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleVersionChange('right', true)}
              disabled={selectedVersions.right >= (revisions?.length || 0)}
            >
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <ScrollArea className="h-[600px]">
          {right && (
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                <p>Created by: {right.profiles?.display_name || 'Unknown'}</p>
                <p>Date: {format(new Date(right.createdAt), 'PPpp')}</p>
                {right.changeSummary && (
                  <p className="mt-2">Summary: {right.changeSummary}</p>
                )}
              </div>
              <pre className="bg-background/50 p-4 rounded-lg overflow-x-auto text-sm">
                {JSON.stringify(right.content, null, 2)}
              </pre>
            </div>
          )}
        </ScrollArea>
      </Card>
    </div>
  );
};
import React from 'react';
import { Button } from '@/components/ui/button';
import { History, Save } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface RevisionControlsProps {
  contentId: string;
  onShowHistory: () => void;
  currentContent: any;
}

export const RevisionControls: React.FC<RevisionControlsProps> = ({
  contentId,
  onShowHistory,
  currentContent
}) => {
  const createRevision = async () => {
    try {
      const { error } = await supabase
        .from('cms_content_revisions')
        .insert({
          content_id: contentId,
          content: currentContent,
          created_by: (await supabase.auth.getUser()).data.user?.id
        });

      if (error) throw error;
      toast.success('Revision saved successfully');
    } catch (error) {
      console.error('Error creating revision:', error);
      toast.error('Failed to save revision');
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={createRevision}
        className="text-primary border-primary/20 hover:bg-primary/10"
      >
        <Save className="w-4 h-4 mr-2" />
        Save Revision
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={onShowHistory}
        className="text-primary border-primary/20 hover:bg-primary/10"
      >
        <History className="w-4 h-4 mr-2" />
        View History
      </Button>
    </div>
  );
};
import React from 'react';
import { Save, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ContentStatus } from '../../core/types/base';

interface ContentEditorToolbarProps {
  status: ContentStatus;
  onSave: (status: 'draft' | 'published') => void;
}

export const ContentEditorToolbar = ({ status, onSave }: ContentEditorToolbarProps) => {
  return (
    <div className="flex justify-end gap-2 mb-4">
      <Button
        variant="outline"
        onClick={() => onSave('draft')}
        className="gap-2"
      >
        <Save className="h-4 w-4" />
        Save Draft
      </Button>
      <Button
        onClick={() => onSave('published')}
        className="gap-2"
      >
        <Send className="h-4 w-4" />
        Publish
      </Button>
    </div>
  );
};
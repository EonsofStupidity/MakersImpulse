import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ContentEditorHeaderProps {
  title: string;
  onClose: () => void;
}

export const ContentEditorHeader = ({ title, onClose }: ContentEditorHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold">
        {title || 'New Content'}
      </h2>
      <Button variant="ghost" size="icon" onClick={onClose}>
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};
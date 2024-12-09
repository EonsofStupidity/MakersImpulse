import React from 'react';
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { ContentPreview } from './ContentPreview';
import type { BaseContent } from '../types/cms';

interface PreviewButtonProps {
  content: BaseContent;
}

export const PreviewButton: React.FC<PreviewButtonProps> = ({ content }) => {
  const [isPreviewOpen, setIsPreviewOpen] = React.useState(false);

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsPreviewOpen(true)}
        className="bg-primary/20 hover:bg-primary/30 border-primary/50"
      >
        <Eye className="w-4 h-4 mr-2" />
        Preview
      </Button>

      <ContentPreview
        content={content}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />
    </>
  );
};
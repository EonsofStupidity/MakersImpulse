import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useCMS } from '../../core/CMSProvider';
import { ContentEditorHeader } from './ContentEditorHeader';
import { ContentEditorForm } from './ContentEditorForm';
import { ContentEditorToolbar } from './ContentEditorToolbar';
import type { CMSContent } from '../../core/types';

export const ContentEditor = () => {
  const { activeContent, updateContent, setActiveContent } = useCMS();

  if (!activeContent) {
    return null;
  }

  const handleSave = async (status: 'draft' | 'published') => {
    try {
      await updateContent({
        ...activeContent,
        status,
        updated_at: new Date().toISOString()
      });
      toast.success(`Content ${status === 'published' ? 'published' : 'saved'} successfully`);
    } catch (error) {
      console.error('Error saving content:', error);
      toast.error('Failed to save content');
    }
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <ContentEditorHeader 
        title={activeContent.title} 
        onClose={() => setActiveContent(null)}
      />
      
      <Card className="p-6">
        <ContentEditorToolbar 
          status={activeContent.status}
          onSave={handleSave}
        />
        
        <ContentEditorForm 
          content={activeContent}
          onChange={(updatedContent: Partial<CMSContent>) => {
            setActiveContent({ ...activeContent, ...updatedContent });
          }}
        />
      </Card>
    </div>
  );
};
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Editor } from '@/components/common/content/Editor';
import type { CMSContent } from '../../core/types';

interface ContentEditorFormProps {
  content: CMSContent;
  onChange: (content: Partial<CMSContent>) => void;
}

export const ContentEditorForm = ({ content, onChange }: ContentEditorFormProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={content.title}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="Enter content title"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">Slug</Label>
        <Input
          id="slug"
          value={content.slug || ''}
          onChange={(e) => onChange({ slug: e.target.value })}
          placeholder="Enter URL slug"
        />
      </div>

      <div className="space-y-2">
        <Label>Content</Label>
        <Editor
          content={content.content.body || ''}
          onChange={(value) => onChange({ 
            content: { 
              ...content.content, 
              body: value 
            } 
          })}
        />
      </div>
    </div>
  );
};
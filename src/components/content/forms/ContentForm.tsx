import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import ContentTypeSelector from './ContentTypeSelector';
import PageContentForm from './PageContentForm';
import ComponentContentForm from './ComponentContentForm';
import { useContent } from '../hooks/useContent';
import { toast } from 'sonner';
import type { ContentType } from '../types/contentTypes';
import type { PageContent, ComponentContent } from '../types/contentTypes';

interface ContentFormProps {
  initialType?: ContentType;
  contentId?: string;
}

const ContentForm: React.FC<ContentFormProps> = ({ initialType = 'page', contentId }) => {
  const [contentType, setContentType] = useState<ContentType>(initialType);
  const { content, createContent, updateContent, isLoading } = useContent(contentId);

  const handleSubmit = async (data: PageContent | ComponentContent) => {
    try {
      if (contentId) {
        await updateContent.mutateAsync({ id: contentId, ...data });
        toast.success('Content updated successfully');
      } else {
        await createContent.mutateAsync(data);
        toast.success('Content created successfully');
      }
    } catch (error) {
      console.error('Error saving content:', error);
      toast.error('Failed to save content');
    }
  };

  const renderForm = () => {
    if (!content && contentId) {
      return null;
    }

    const formProps = {
      initialData: content ? {
        ...content,
        content: content.content || {},
      } : undefined,
      onSubmit: handleSubmit,
    };

    switch (contentType) {
      case 'page':
        return <PageContentForm {...formProps} />;
      case 'component':
        return <ComponentContentForm {...formProps} />;
      default:
        return <div>Form for {contentType} type is not implemented yet</div>;
    }
  };

  return (
    <Card className="p-6 bg-black/40 backdrop-blur-xl border-white/10">
      <div className="space-y-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-white/70 mb-2">
            Content Type
          </label>
          <ContentTypeSelector value={contentType} onChange={setContentType} />
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neon-cyan"></div>
          </div>
        ) : (
          renderForm()
        )}
      </div>
    </Card>
  );
};

export default ContentForm;
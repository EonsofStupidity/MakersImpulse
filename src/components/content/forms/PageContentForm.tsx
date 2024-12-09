import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { pageContentSchema } from '../types/contentTypes';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import EditorCore from '../blog/components/editor/EditorCore';
import type { PageContent } from '../types/contentTypes';

interface PageContentFormProps {
  initialData?: Partial<PageContent>;
  onSubmit: (data: PageContent) => void;
}

const PageContentForm: React.FC<PageContentFormProps> = ({ initialData, onSubmit }) => {
  const form = useForm<PageContent>({
    resolver: zodResolver(pageContentSchema),
    defaultValues: {
      type: 'page',
      title: initialData?.title || '',
      content: {
        body: initialData?.content?.body || '',
        seo: initialData?.content?.seo || {},
      },
      status: initialData?.status || 'draft',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white/5 border-white/10" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content.body"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <EditorCore content={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="bg-neon-cyan/20 text-white border border-neon-cyan/50 hover:bg-neon-cyan/30"
        >
          Save Page
        </Button>
      </form>
    </Form>
  );
};

export default PageContentForm;
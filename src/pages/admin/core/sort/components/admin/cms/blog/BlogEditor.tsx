import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ImageUpload } from '../shared/ImageUpload';
import { useToast } from '@/components/ui/use-toast';

interface BlogEditorProps {
  onSave: (content: { title: string; content: string; featuredImage?: string }) => void;
  initialContent?: { title: string; content: string; featuredImage?: string };
}

export const BlogEditor = ({ onSave, initialContent }: BlogEditorProps) => {
  const [title, setTitle] = useState(initialContent?.title || '');
  const [content, setContent] = useState(initialContent?.content || '');
  const [featuredImage, setFeaturedImage] = useState(initialContent?.featuredImage);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ title, content, featuredImage });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded-md"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Featured Image</label>
        <ImageUpload
          onUploadSuccess={(url) => setFeaturedImage(url)}
          onUploadError={() => toast({
            title: "Error",
            description: "Failed to upload image",
            variant: "destructive"
          })}
        />
        {featuredImage && (
          <img src={featuredImage} alt="Featured" className="max-h-40 object-cover rounded-md" />
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="content" className="text-sm font-medium">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border rounded-md min-h-[200px]"
          required
        />
      </div>

      <Button type="submit">Save Post</Button>
    </form>
  );
};
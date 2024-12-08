import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ImagePlus, Upload, X } from "lucide-react";
import { EditorToolbar } from "@/components/common/editor/EditorToolbar";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { PostTags } from "./components/PostTags";

interface CreatePostFormProps {
  onClose: () => void;
}

export function CreatePostForm({ onClose }: CreatePostFormProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const { toast } = useToast();

  // Query to fetch categories
  const { data: categories } = useQuery({
    queryKey: ['cms-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cms_categories')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data || [];
    }
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: "rounded-lg max-w-full",
        },
      }),
    ],
    editorProps: {
      attributes: {
        class: "prose prose-sm dark:prose-invert max-w-none focus:outline-none min-h-[200px] p-4",
      },
    },
  });

  const createPost = useMutation({
    mutationFn: async (data: { title: string; content: string; status: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("Not authenticated");
      }

      const { error } = await supabase
        .from("blog_posts")
        .insert([{
          title: data.title,
          content: data.content,
          author_id: user.id,
          category_id: category,
          tags: tags,
          slug: data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          publication_status: data.status
        }]);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Post created successfully",
      });
      onClose();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSave = (status: 'draft' | 'published') => {
    if (!editor || !title) {
      toast({
        title: "Error",
        description: "Please provide a title and content",
        variant: "destructive",
      });
      return;
    }

    createPost.mutate({
      title,
      content: editor.getHTML(),
      status
    });
  };

  const handleTagSelect = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const addImage = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        setIsUploading(true);
        
        const file = target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        
        try {
          const response = await supabase.functions.invoke('upload-blog-image', {
            body: formData,
          });

          if (response.error) throw response.error;

          const imageUrl = response.data.url;
          if (editor) {
            editor.chain().focus().setImage({ src: imageUrl }).run();
          }
          setUploadedImages(prev => [...prev, imageUrl]);
          
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to upload image",
            variant: "destructive",
          });
        } finally {
          setIsUploading(false);
        }
      }
    };
    input.click();
  };

  return (
    <div className="space-y-4 h-full flex flex-col">
      <h1 className="text-3xl font-bold mb-6">Create New Post</h1>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-xl">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
            className="w-[60%]"
          />
        </div>

        <div className="space-y-2 w-[60%]">
          <Label>Category</Label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2"
          >
            <option value="">Select a category</option>
            {categories?.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <Card className="flex-1">
          <EditorToolbar editor={editor} onImageUpload={addImage} isUploading={isUploading} />
          <EditorContent editor={editor} className="min-h-[300px]" />
        </Card>

        <PostTags onSelectTag={handleTagSelect} />
        
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag) => (
            <Badge 
              key={tag} 
              variant="secondary"
              className="flex items-center gap-1"
            >
              {tag}
              <X
                className="h-3 w-3 cursor-pointer hover:text-destructive"
                onClick={() => setTags(tags.filter(t => t !== tag))}
              />
            </Badge>
          ))}
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={addImage} disabled={isUploading}>
              <ImagePlus className="w-4 h-4 mr-2" />
              Add Image
            </Button>
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center cursor-pointer hover:border-primary transition-colors"
              onDragOver={(e) => e.preventDefault()}
              onDrop={async (e) => {
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                if (file && file.type.startsWith('image/')) {
                  setIsUploading(true);
                  const formData = new FormData();
                  formData.append('file', file);
                  
                  try {
                    const response = await supabase.functions.invoke('upload-blog-image', {
                      body: formData,
                    });

                    if (response.error) throw response.error;

                    const imageUrl = response.data.url;
                    if (editor) {
                      editor.chain().focus().setImage({ src: imageUrl }).run();
                    }
                    setUploadedImages(prev => [...prev, imageUrl]);
                    
                  } catch (error) {
                    toast({
                      title: "Error",
                      description: "Failed to upload image",
                      variant: "destructive",
                    });
                  } finally {
                    setIsUploading(false);
                  }
                }
              }}
            >
              <Upload className="w-4 h-4 mr-2" />
              Drop image here
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="outline" onClick={() => handleSave('draft')} disabled={createPost.isPending}>
              Save as Draft
            </Button>
            <Button onClick={() => handleSave('published')} disabled={createPost.isPending}>
              Publish
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={selectedImageIndex !== null} onOpenChange={() => setSelectedImageIndex(null)}>
        <DialogContent className="max-w-[85vw] max-h-[85vh] p-0">
          {selectedImageIndex !== null && (
            <img
              src={uploadedImages[selectedImageIndex]}
              alt={`Preview ${selectedImageIndex + 1}`}
              className="w-full h-full object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
import { PostEditor } from "@/components/blog/PostEditor";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, ImageIcon } from "lucide-react";
import { handleImageUpload } from "@/components/admin/cms/ImageUploadHandler";

const CreatePost = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    
    acceptedFiles.forEach(file => {
      handleImageUpload(
        file,
        toast,
        (url) => {
          // Insert the image URL into the editor
          const img = document.createElement('img');
          img.src = url;
          document.querySelector('.prose')?.appendChild(img);
        },
        () => {}
      );
    });
  }, [toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    }
  });

  const handleSave = async (data: any) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("Not authenticated");
      }

      if (!data.title) {
        throw new Error("Title is required");
      }

      const postData = {
        title: data.title,
        content: data.content || "",
        author_id: user.id,
        slug: data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        publication_status: data.status || 'draft',
        category_id: data.category_id || null,
        tags: Array.isArray(data.tags) ? data.tags : []
      };

      const { error } = await supabase
        .from("blog_posts")
        .insert([postData]);

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Post created successfully",
      });

      navigate("/admin/blog");
    } catch (error: any) {
      console.error("Error in handleSave:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create post",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-6 px-4">
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-lg p-8 mb-4 transition-colors ${
          isDragActive ? 'border-primary bg-primary/5' : 'border-muted'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <Upload className="h-12 w-12 text-muted-foreground" />
          <div className="space-y-2">
            <p className="text-sm font-medium">
              {isDragActive ? 'Drop images here' : 'Drag & drop images here'}
            </p>
            <p className="text-xs text-muted-foreground">
              PNG, JPG, GIF up to 5MB
            </p>
          </div>
        </div>
      </div>

      <PostEditor onSave={handleSave} />
      
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t md:hidden">
        <Button 
          onClick={() => handleSave({ status: 'published' })}
          className="w-full"
          size="lg"
        >
          Publish Post
        </Button>
      </div>
    </div>
  );
};

export default CreatePost;
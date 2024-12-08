import { supabase } from "@/integrations/supabase/client";
import { toast as toastFn } from "@/components/ui/use-toast";

export const handleImageUpload = async (
  file: File,
  toast: typeof toastFn,
  onSuccess: (url: string) => void,
  onError: () => void,
  uploadType: 'blog' | 'data_maestro' = 'blog'
) => {
  // Validate file type
  if (!file.type.startsWith('image/')) {
    toast({
      title: "Invalid file type",
      description: "Please upload an image file",
      variant: "destructive",
    });
    onError();
    return;
  }

  // Validate file size (5MB limit)
  if (file.size > 5 * 1024 * 1024) {
    toast({
      title: "File too large",
      description: "Image must be less than 5MB",
      variant: "destructive",
    });
    onError();
    return;
  }

  try {
    let publicUrl: string;

    if (uploadType === 'blog') {
      // Use the blog-specific upload endpoint
      const formData = new FormData();
      formData.append('file', file);

      const response = await supabase.functions.invoke('upload-blog-image', {
        body: formData,
      });

      if (response.error) throw response.error;
      publicUrl = response.data.url;
    } else {
      // Use the existing data maestro upload flow
      const fileExt = file.name.split('.').pop();
      const filePath = `${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError, data } = await supabase.storage
        .from('blog_images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl: url } } = supabase.storage
        .from('blog_images')
        .getPublicUrl(filePath);
      
      publicUrl = url;
    }

    toast({
      title: "Success",
      description: "Image uploaded successfully",
    });
    
    onSuccess(publicUrl);
  } catch (error) {
    console.error('Upload error:', error);
    toast({
      title: "Upload failed",
      description: "Failed to upload image. Please try again.",
      variant: "destructive",
    });
    onError();
  }
};
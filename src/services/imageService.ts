import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface ImageUploadResult {
  url: string;
  error?: string;
}

export const uploadBlogImage = async (file: File, postId: string): Promise<ImageUploadResult> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `blog-posts/${postId}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('media')
      .upload(filePath, file);

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return { url: '', error: 'Failed to upload image' };
    }

    const { data: { publicUrl } } = supabase.storage
      .from('media')
      .getPublicUrl(filePath);

    return { url: publicUrl };
  } catch (error) {
    console.error('Image upload error:', error);
    return { url: '', error: 'Failed to process image upload' };
  }
};

export const validateBlogImage = async (imageUrl: string): Promise<boolean> => {
  if (!imageUrl) return false;

  try {
    const urlMatch = imageUrl.match(/\/storage\/v1\/object\/public\/([^/]+)\/(.+)/);
    if (!urlMatch) return false;

    const [, bucket, path] = urlMatch;
    const pathParts = path.split('/');
    const fileName = pathParts.pop();
    const directory = pathParts.join('/');

    const { data, error } = await supabase.storage
      .from(bucket)
      .list(directory, {
        limit: 1,
        search: fileName
      });

    if (error) {
      console.error('Storage validation error:', error);
      return false;
    }

    return data && data.length > 0;
  } catch (error) {
    console.error('Image validation error:', error);
    return false;
  }
};
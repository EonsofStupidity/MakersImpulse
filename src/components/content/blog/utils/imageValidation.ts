import { supabase } from "@/integrations/supabase/client";

export const validateBlogImage = async (imageUrl: string): Promise<boolean> => {
  try {
    // Extract the file path from the full URL
    const storagePathMatch = imageUrl.match(/\/storage\/v1\/object\/public\/media\/(.+)$/);
    if (!storagePathMatch) {
      console.error('Invalid storage URL format:', imageUrl);
      return false;
    }

    const { data } = supabase.storage
      .from('media')
      .getPublicUrl(storagePathMatch[1]);

    if (!data.publicUrl) {
      console.error('No public URL generated for:', imageUrl);
      return false;
    }

    // Verify the image exists and is accessible
    const response = await fetch(data.publicUrl, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    console.error('Error validating image:', error);
    return false;
  }
};
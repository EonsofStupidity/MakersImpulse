import { supabase } from "@/integrations/supabase/client";

export const ACCEPTED_IMAGE_FORMATS = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/avif'
];

export const validateImageFile = (file: File): boolean => {
  return ACCEPTED_IMAGE_FORMATS.includes(file.type);
};

export const validateBlogImage = async (imageUrl: string): Promise<boolean> => {
  try {
    if (!imageUrl) {
      console.error('Invalid image URL provided');
      return false;
    }

    // Extract bucket name and file path from URL
    const urlParts = imageUrl.split('/storage/v1/object/public/');
    if (urlParts.length !== 2) {
      console.error('Invalid Supabase storage URL format');
      return false;
    }

    const [bucket, filePath] = urlParts[1].split('/', 1);
    const path = urlParts[1].slice(bucket.length + 1);

    // Get the file metadata directly
    const { data, error } = await supabase
      .storage
      .from(bucket)
      .createSignedUrl(path, 60);

    if (error) {
      console.error('Error validating image:', error);
      return false;
    }

    return !!data;
  } catch (error) {
    console.error('Error in validateBlogImage:', error);
    return false;
  }
};

export const validateImageCount = (currentCount: number, maxCount: number = 7): boolean => {
  return currentCount < maxCount;
};
import { supabase } from "@/integrations/supabase/client";

export const validateBlogImage = async (imageUrl: string): Promise<boolean> => {
  try {
    console.log('Validating image URL:', imageUrl);
    
    // Check if URL is valid
    if (!imageUrl) {
      console.error('Invalid image URL provided');
      return false;
    }

    // Extract the file path from the URL
    const urlParts = imageUrl.split('/storage/v1/object/public/');
    if (urlParts.length !== 2) {
      console.error('Invalid Supabase storage URL format');
      return false;
    }

    const bucketPath = urlParts[1];
    const [bucket, ...pathParts] = bucketPath.split('/');
    const filePath = pathParts.join('/');

    console.log('Checking file exists in bucket:', bucket, 'path:', filePath);

    // Check if the file exists in the bucket
    const { data, error } = await supabase
      .storage
      .from(bucket)
      .list(pathParts.slice(0, -1).join('/'), {
        limit: 1,
        offset: 0,
        search: pathParts[pathParts.length - 1]
      });

    if (error) {
      console.error('Error checking file existence:', error);
      return false;
    }

    const fileExists = data && data.length > 0;
    console.log('File exists:', fileExists);

    return fileExists;
  } catch (error) {
    console.error('Error validating image:', error);
    return false;
  }
};
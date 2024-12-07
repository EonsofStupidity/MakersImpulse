import { supabase } from "@/integrations/supabase/client";

export const validateImageInMediaTable = async (imageUrl: string): Promise<boolean> => {
  const { data: mediaData, error: mediaError } = await supabase
    .from('media')
    .select('id')
    .eq('url', imageUrl)
    .maybeSingle();

  if (mediaError) {
    console.error('Error checking media table:', mediaError);
    return false;
  }

  if (mediaData) {
    console.log('Image found in media table:', imageUrl);
    return true;
  }

  return false;
};

export const validateImageInStorage = async (imageUrl: string): Promise<boolean> => {
  try {
    const match = imageUrl.match(/storage\/v1\/object\/public\/([^/]+)\/(.+)/);
    if (!match) {
      console.error('Invalid storage URL format:', imageUrl);
      return false;
    }

    const [, bucket, path] = match;
    console.log('Checking storage:', { bucket, path });

    const { data, error } = await supabase.storage
      .from(bucket)
      .list(path.split('/').slice(0, -1).join('/'), {
        limit: 1,
        search: path.split('/').pop()
      });

    if (error) {
      console.error('Storage list error:', error);
      return false;
    }

    const exists = data && data.length > 0;
    console.log('Image exists in storage:', exists);
    return exists;
  } catch (error) {
    console.error('Storage validation error:', error);
    return false;
  }
};
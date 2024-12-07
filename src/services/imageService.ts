import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface ImageUploadResult {
  url: string;
  error?: string;
}

export const uploadBlogImage = async (file: File, postId: string): Promise<ImageUploadResult> => {
  try {
    console.log('Starting image upload for post:', postId);
    
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `blog/${postId}/${fileName}`;

    console.log('Uploading file to path:', filePath);

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

    console.log('File uploaded successfully, public URL:', publicUrl);

    // Create media record
    const { error: mediaError } = await supabase
      .from('media')
      .insert({
        name: fileName,
        url: publicUrl,
        type: file.type,
        size: file.size,
        blog_post_id: postId
      });

    if (mediaError) {
      console.error('Error creating media record:', mediaError);
      return { url: publicUrl, error: 'Failed to create media record' };
    }

    // Update blog post images array
    const { error: updateError } = await supabase
      .from('blog_posts')
      .update({
        images: supabase.sql`array_append(images, ${publicUrl})`
      })
      .eq('id', postId);

    if (updateError) {
      console.error('Error updating blog post images:', updateError);
      return { url: publicUrl, error: 'Image uploaded but failed to update post' };
    }

    return { url: publicUrl };
  } catch (error) {
    console.error('Image upload error:', error);
    return { url: '', error: 'Failed to process image upload' };
  }
};

export const validateBlogImage = async (imageUrl: string): Promise<boolean> => {
  try {
    console.log('Validating image URL:', imageUrl);

    if (!imageUrl) {
      console.log('No image URL provided');
      return false;
    }

    // Check if image exists in media table first
    const { data: mediaData, error: mediaError } = await supabase
      .from('media')
      .select('id')
      .eq('url', imageUrl)
      .maybeSingle();

    if (mediaError) {
      console.error('Error checking media record:', mediaError);
    } else if (mediaData) {
      console.log('Image found in media table:', mediaData);
      return true;
    }

    // If not in media table, extract bucket and path from URL
    const match = imageUrl.match(/storage\/v1\/object\/public\/([^/]+)\/(.+)/);
    if (!match) {
      console.log('Invalid storage URL format:', imageUrl);
      return false;
    }

    const [, bucket, path] = match;
    console.log('Checking storage bucket:', bucket, 'path:', path);

    // Check if file exists in storage
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
    console.error('Image validation error:', error);
    return false;
  }
};
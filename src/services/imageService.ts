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
    const { error: updateError } = await supabase.rpc(
      'append_blog_image',
      { post_id: postId, image_url: publicUrl }
    );

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
    if (!imageUrl) {
      console.log('No image URL provided');
      return false;
    }

    // Extract the media ID from the URL if it exists in the database
    const { data: mediaData, error: mediaError } = await supabase
      .from('media')
      .select('id, url')
      .eq('url', imageUrl)
      .single();

    if (mediaError) {
      console.error('Error checking media record:', mediaError);
      return false;
    }

    if (mediaData) {
      console.log('Image found in media table:', mediaData);
      return true;
    }

    // Fallback to checking storage directly
    const urlParts = imageUrl.split('/media/');
    if (urlParts.length !== 2) {
      console.log('Invalid storage URL format:', imageUrl);
      return false;
    }

    const filePath = urlParts[1];
    console.log('Checking storage path:', filePath);

    const { data, error } = await supabase.storage
      .from('media')
      .download(filePath);

    if (error) {
      console.error('Storage validation error:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Image validation error:', error);
    return false;
  }
};
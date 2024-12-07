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
    const filePath = `uploads/${fileName}`; // Simplified path structure

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
  console.log('Validating blog image:', imageUrl);
  
  if (!imageUrl) {
    console.log('No image URL provided');
    return false;
  }

  try {
    // Extract bucket and path from URL
    const urlMatch = imageUrl.match(/\/storage\/v1\/object\/public\/([^/]+)\/(.+)/);
    if (!urlMatch) {
      console.log('Invalid storage URL format:', imageUrl);
      return false;
    }

    const [, bucket, path] = urlMatch;
    const directory = path.split('/')[0]; // Get the first directory segment
    const fileName = path.split('/').pop(); // Get the file name

    console.log('Checking file in bucket:', bucket, 'directory:', directory, 'filename:', fileName);

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

    const exists = data && data.length > 0;
    console.log('Image exists:', exists);
    return exists;
  } catch (error) {
    console.error('Image validation error:', error);
    return false;
  }
};
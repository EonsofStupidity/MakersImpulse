export * from './image-handling/validation';
export * from './image-handling/upload';
export * from './image-handling/types';

export const validateBlogImage = async (imageUrl: string): Promise<boolean> => {
  try {
    console.log('Validating image URL:', imageUrl);

    if (!imageUrl) {
      console.log('No image URL provided');
      return false;
    }

    // First check media table
    const isInMediaTable = await validateImageInMediaTable(imageUrl);
    if (isInMediaTable) return true;

    // Then check storage
    return await validateImageInStorage(imageUrl);
  } catch (error) {
    console.error('Image validation error:', error);
    return false;
  }
};
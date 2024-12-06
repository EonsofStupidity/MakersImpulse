export const ACCEPTED_IMAGE_FORMATS = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/avif',
  'image/jxl',
  'image/heic',
  'image/heif',
  'image/tiff',
  'image/svg+xml'
] as const;

export type AcceptedImageFormat = typeof ACCEPTED_IMAGE_FORMATS[number];

export const validateImageFile = (file: File): boolean => {
  return ACCEPTED_IMAGE_FORMATS.includes(file.type as AcceptedImageFormat);
};
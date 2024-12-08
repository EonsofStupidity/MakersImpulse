export interface MediaItem {
  id: string;
  file_name: string;
  file_type: string;
  url: string;
  alt_text: string | null;
  caption: string | null;
}
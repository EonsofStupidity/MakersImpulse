export interface Profile {
  id: string;
  username: string | null;
  avatar_url: string | null;
  bio: string | null;
  location: string | null;
  interests: string[] | null;
  signature: string | null;
  display_name: string | null;
}
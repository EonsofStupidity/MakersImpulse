import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Post {
  id: string;
  title: string;
  content: string;
  status: string | null;
  updated_at: string | null;
  views_count: number | null;
  author_id: string | null;
}

export interface PostWithAuthor extends Post {
  author_display_name: string | null;
  author_username: string | null;
}

export const usePostsQuery = () => {
  return useQuery({
    queryKey: ['admin-posts'],
    queryFn: async () => {
      console.log('Starting posts fetch operation...');
      
      // First, let's try to get the raw query response
      const { data: rawData, error: rawError } = await supabase
        .from('blog_posts')
        .select(`
          *,
          profiles (
            display_name,
            username
          )
        `)
        .order('updated_at', { ascending: false });

      console.log('Raw Supabase Response:', { data: rawData, error: rawError });

      if (rawError) {
        console.error('Error in Supabase query:', rawError);
        toast.error('Failed to load posts');
        throw rawError;
      }

      if (!rawData) {
        console.warn('No data returned from Supabase');
        return [];
      }

      // Transform the data
      console.log('Transforming posts data...');
      const transformedData: PostWithAuthor[] = rawData.map(post => {
        const transformed = {
          ...post,
          author_display_name: null as string | null,
          author_username: null as string | null,
        };

        // Separate logging for profile data
        console.log('Post profile data:', {
          postId: post.id,
          profiles: post.profiles,
          authorId: post.author_id
        });

        // If we have profile data, try to extract it
        if (post.profiles && Array.isArray(post.profiles) && post.profiles[0]) {
          transformed.author_display_name = post.profiles[0].display_name;
          transformed.author_username = post.profiles[0].username;
        }

        return transformed;
      });

      console.log('Successfully transformed posts:', transformedData);
      return transformedData;
    },
  });
};
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { PostList } from "@/components/blog/PostList";
import { CreatePostForm } from "@/components/blog/CreatePostForm";
import { supabase } from "@/integrations/supabase/client";

const BlogDashboard = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const { data: posts, isLoading, refetch } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select(`
          id,
          title,
          slug,
          excerpt,
          publication_status,
          created_at,
          updated_at,
          published_at,
          author_id,
          views_count,
          profiles!blog_posts_author_id_fkey (
            display_name,
            username
          ),
          cms_categories!blog_posts_category_id_fkey (
            name
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  return (
    <Dialog open={true}>
      <DialogContent 
        className="max-w-[90vw] w-[1400px] h-[90vh] flex flex-col"
        onEscapeKeyDown={() => window.history.back()}
      >
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <DialogTitle className="text-3xl font-bold">Blog Posts</DialogTitle>
          <div className="flex items-center gap-4">
            <Button onClick={() => setIsCreateOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => window.history.back()}
              className="h-8 w-8"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
        </div>

        <PostList 
          posts={posts || []} 
          isLoading={isLoading} 
          onPostsDeleted={() => refetch()}
        />

        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogContent 
            className="max-w-[85vw] w-[1200px] h-[90vh]"
            onEscapeKeyDown={() => setIsCreateOpen(false)}
          >
            <div className="flex justify-between items-center mb-4 border-b pb-4">
              <DialogTitle className="text-2xl font-bold">Create New Post</DialogTitle>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsCreateOpen(false)}
                className="h-8 w-8"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <CreatePostForm onClose={() => setIsCreateOpen(false)} />
          </DialogContent>
        </Dialog>
      </DialogContent>
    </Dialog>
  );
};

export default BlogDashboard;
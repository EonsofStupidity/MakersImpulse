import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { PostEditor } from "@/components/blog/PostEditor";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const EditPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: post, isLoading } = useQuery({
    queryKey: ["blog-post", id],
    queryFn: async () => {
      if (!id) throw new Error("No post ID provided");
      
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id // Only run query if we have an ID
  });

  const handleSave = async (data: any) => {
    try {
      if (!id) throw new Error("No post ID provided");

      const { error } = await supabase
        .from("blog_posts")
        .update({
          ...data,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Post updated successfully",
      });

      navigate("/admin/blog");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="max-w-5xl mx-auto py-6">
      <PostEditor initialData={post} onSave={handleSave} />
    </div>
  );
};

export default EditPost;
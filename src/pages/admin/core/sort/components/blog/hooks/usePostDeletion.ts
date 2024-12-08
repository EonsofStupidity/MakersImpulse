import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const usePostDeletion = (onPostsDeleted?: () => void) => {
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [postsToDelete, setPostsToDelete] = useState<any[]>([]);
  const { toast } = useToast();

  const deletePosts = useMutation({
    mutationFn: async (postIds: string[]) => {
      const { error } = await supabase
        .from("blog_posts")
        .delete()
        .in("id", postIds);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Posts deleted successfully",
      });
      setSelectedPosts([]);
      setShowDeleteDialog(false);
      onPostsDeleted?.();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSelectPost = (postId: string, checked: boolean) => {
    if (postId.includes(',')) {
      const ids = postId.split(',');
      setSelectedPosts(checked ? ids : []);
    } else {
      setSelectedPosts(prev =>
        checked
          ? [...prev, postId]
          : prev.filter(id => id !== postId)
      );
    }
  };

  const handleDeleteClick = (posts: any[]) => {
    setPostsToDelete(posts);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (confirmDelete) {
      deletePosts.mutate(postsToDelete.map(post => post.id));
    }
  };

  return {
    selectedPosts,
    showDeleteDialog,
    confirmDelete,
    postsToDelete,
    setShowDeleteDialog,
    setConfirmDelete,
    handleSelectPost,
    handleDeleteClick,
    handleConfirmDelete,
  };
};
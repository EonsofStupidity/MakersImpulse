import React from "react";
import { Navigation } from "@/components/shared/ui/Navigation";
import { AdminNav } from "@/components/admin/dashboard/AdminNav";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { 
  Loader2, 
  Calendar,
  Eye,
  Edit2,
  Trash2,
  CheckCircle,
  XCircle,
  User,
  ArrowUpDown
} from "lucide-react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface PostWithAuthor {
  id: string;
  title: string;
  content: string;
  status: string | null;
  updated_at: string | null;
  views_count: number | null;
  author_id: string | null;
  author_display_name: string | null;
  author_username: string | null;
  profiles?: {
    display_name: string | null;
    username: string | null;
  }[];
}

const PostsManagement = () => {
  const { data: posts, isLoading, refetch } = useQuery({
    queryKey: ['admin-posts'],
    queryFn: async () => {
      console.log('Fetching posts...');
      // Join blog_posts with profiles using a subquery
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          *,
          profiles!blog_posts_author_id_fkey (
            display_name,
            username
          )
        `)
        .order('updated_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching posts:', error);
        toast.error('Failed to load posts');
        throw error;
      }

      // Transform the data to match our PostWithAuthor interface
      const transformedData: PostWithAuthor[] = data.map(post => ({
        ...post,
        author_display_name: post.profiles?.[0]?.display_name || null,
        author_username: post.profiles?.[0]?.username || null
      }));

      console.log('Posts fetched successfully:', transformedData);
      return transformedData;
    },
  });

  const handleDelete = async (postId: string) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', postId);

      if (error) throw error;

      toast.success('Post deleted successfully');
      refetch();
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Failed to delete post');
    }
  };

  const getStatusBadge = (status: string | null) => {
    switch (status) {
      case 'published':
        return (
          <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
            <CheckCircle className="w-3 h-3 mr-1" />
            Published
          </Badge>
        );
      case 'draft':
        return (
          <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20">
            <XCircle className="w-3 h-3 mr-1" />
            Draft
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            {status || 'Unknown'}
          </Badge>
        );
    }
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-900 pt-20 p-8">
        <AdminNav />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">Posts Management</h1>
            <Button 
              onClick={() => {}} 
              className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white"
            >
              New Post
            </Button>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="w-8 h-8 text-[#ff0abe] animate-spin" />
            </div>
          ) : (
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-white">Title</TableHead>
                    <TableHead className="text-white">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Date
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead className="text-white">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Author
                      </div>
                    </TableHead>
                    <TableHead className="text-white">Status</TableHead>
                    <TableHead className="text-white">
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        Views
                      </div>
                    </TableHead>
                    <TableHead className="text-white text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts?.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell className="font-medium text-white">
                        {post.title}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {post.updated_at ? format(new Date(post.updated_at), 'MMM dd, yyyy') : 'N/A'}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {post.author_display_name || post.author_username || 'Unknown'}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(post.status)}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {post.views_count || 0}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {}}
                            className="h-8 w-8 text-[#9b87f5] hover:text-[#7E69AB] hover:bg-[#9b87f5]/10"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-500/10"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Post</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this post? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(post.id)}
                                  className="bg-red-500 hover:bg-red-600"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default PostsManagement;
import React from "react";
import { format } from "date-fns";
import { Edit2, Trash2 } from "lucide-react";
import { PostWithAuthor } from "@/hooks/posts/usePostsQuery";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
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

interface PostsTableProps {
  posts: PostWithAuthor[];
  onDelete: (postId: string) => Promise<void>;
}

export const PostsTable: React.FC<PostsTableProps> = ({ posts, onDelete }) => {
  console.log('Rendering PostsTable with posts:', posts);
  
  const getStatusBadge = (status: string | null) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-500/10 text-green-500">Published</Badge>;
      case 'draft':
        return <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500">Draft</Badge>;
      default:
        return <Badge variant="outline">{status || 'Unknown'}</Badge>;
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-white">Title</TableHead>
          <TableHead className="text-white">Date</TableHead>
          <TableHead className="text-white">Author</TableHead>
          <TableHead className="text-white">Status</TableHead>
          <TableHead className="text-white">Views</TableHead>
          <TableHead className="text-white text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
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
                        onClick={() => onDelete(post.id)}
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
  );
};
import React, { useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
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
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  
  console.log('Rendering PostsTable with posts:', posts);
  
  const getStatusBadge = (status: string | null) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-0">Published</Badge>;
      case 'draft':
        return <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 border-0">Draft</Badge>;
      default:
        return <Badge variant="outline" className="border-zinc-200 dark:border-zinc-800">{status || 'Unknown'}</Badge>;
    }
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedPosts(checked ? posts.map(post => post.id) : []);
  };

  const handleSelectPost = (postId: string, checked: boolean) => {
    setSelectedPosts(prev => 
      checked ? [...prev, postId] : prev.filter(id => id !== postId)
    );
  };

  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50">
            <TableHead className="w-12">
              <Checkbox 
                checked={selectedPosts.length === posts.length}
                onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
                aria-label="Select all posts"
                className="translate-y-[2px]"
              />
            </TableHead>
            <TableHead className="font-semibold text-zinc-900 dark:text-zinc-100">Title</TableHead>
            <TableHead className="font-semibold text-zinc-900 dark:text-zinc-100">Date</TableHead>
            <TableHead className="font-semibold text-zinc-900 dark:text-zinc-100">Author</TableHead>
            <TableHead className="font-semibold text-zinc-900 dark:text-zinc-100">Status</TableHead>
            <TableHead className="font-semibold text-zinc-900 dark:text-zinc-100">Views</TableHead>
            <TableHead className="text-right font-semibold text-zinc-900 dark:text-zinc-100">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow 
              key={post.id} 
              className="hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 transition-colors"
            >
              <TableCell className="w-12">
                <Checkbox 
                  checked={selectedPosts.includes(post.id)}
                  onCheckedChange={(checked) => handleSelectPost(post.id, checked as boolean)}
                  aria-label={`Select post ${post.title}`}
                  className="translate-y-[2px]"
                />
              </TableCell>
              <TableCell className="font-medium text-zinc-900 dark:text-zinc-100">
                {post.title}
              </TableCell>
              <TableCell className="text-zinc-600 dark:text-zinc-400">
                {post.updated_at ? format(new Date(post.updated_at), 'MMM dd, yyyy') : 'N/A'}
              </TableCell>
              <TableCell className="text-zinc-600 dark:text-zinc-400">
                {post.profiles?.display_name || post.profiles?.username || 'Unknown'}
              </TableCell>
              <TableCell>
                {getStatusBadge(post.status)}
              </TableCell>
              <TableCell className="text-zinc-600 dark:text-zinc-400">
                {post.views_count || 0}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {}}
                    className="h-8 w-8 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-500/10 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-zinc-900 dark:text-zinc-100">Delete Post</AlertDialogTitle>
                        <AlertDialogDescription className="text-zinc-600 dark:text-zinc-400">
                          Are you sure you want to delete this post? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="bg-transparent border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => onDelete(post.id)}
                          className="bg-red-500 hover:bg-red-600 text-white border-0"
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
      {selectedPosts.length > 0 && (
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              {selectedPosts.length} {selectedPosts.length === 1 ? 'post' : 'posts'} selected
            </span>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  size="sm"
                  className="bg-red-500 hover:bg-red-600 text-white border-0"
                >
                  Delete Selected
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-zinc-900 dark:text-zinc-100">Delete Selected Posts</AlertDialogTitle>
                  <AlertDialogDescription className="text-zinc-600 dark:text-zinc-400">
                    Are you sure you want to delete {selectedPosts.length} {selectedPosts.length === 1 ? 'post' : 'posts'}? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-transparent border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      Promise.all(selectedPosts.map(id => onDelete(id)));
                      setSelectedPosts([]);
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white border-0"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      )}
    </div>
  );
};
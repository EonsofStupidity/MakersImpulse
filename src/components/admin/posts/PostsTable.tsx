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
import { showSuccessToast, showLoadingToast } from "@/lib/toast-config";

interface PostsTableProps {
  posts: PostWithAuthor[];
  onDelete: (postId: string) => Promise<void>;
}

export const PostsTable: React.FC<PostsTableProps> = ({ posts, onDelete }) => {
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [deletingPosts, setDeletingPosts] = useState<string[]>([]);
  
  console.log('Rendering PostsTable with posts:', posts);
  
  const getStatusBadge = (status: string | null) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-[#41f0db]/10 text-[#41f0db] hover:bg-[#41f0db]/20 border-0">Published</Badge>;
      case 'draft':
        return <Badge className="bg-[#ff0abe]/10 text-[#ff0abe] hover:bg-[#ff0abe]/20 border-0">Draft</Badge>;
      default:
        return <Badge variant="outline" className="border-zinc-700 text-zinc-400">{status || 'Unknown'}</Badge>;
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

  const handleDelete = async (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    setDeletingPosts(prev => [...prev, postId]);
    const loadingToast = showLoadingToast(`Deleting ${post.title}...`);
    
    try {
      await onDelete(postId);
      toast.dismiss(loadingToast);
      showSuccessToast(`Successfully deleted ${post.title}`);
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.dismiss(loadingToast);
      showErrorToast(`Failed to delete ${post.title}`);
    } finally {
      setDeletingPosts(prev => prev.filter(id => id !== postId));
    }
  };

  const handleBulkDelete = async () => {
    const loadingToast = showLoadingToast(`Deleting ${selectedPosts.length} posts...`);
    
    try {
      await Promise.all(selectedPosts.map(id => onDelete(id)));
      toast.dismiss(loadingToast);
      showSuccessToast(`Successfully deleted ${selectedPosts.length} posts`);
      setSelectedPosts([]);
    } catch (error) {
      console.error('Error in bulk delete:', error);
      toast.dismiss(loadingToast);
      showErrorToast('Failed to delete some posts');
    }
  };

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/50">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-zinc-800/50 border-b border-zinc-800">
            <TableHead className="w-12">
              <Checkbox 
                checked={selectedPosts.length === posts.length}
                onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
                aria-label="Select all posts"
                className="translate-y-[2px] data-[state=checked]:bg-[#ff0abe] data-[state=checked]:border-[#ff0abe]"
              />
            </TableHead>
            <TableHead className="font-semibold text-zinc-100">Title</TableHead>
            <TableHead className="font-semibold text-zinc-100">Date</TableHead>
            <TableHead className="font-semibold text-zinc-100">Author</TableHead>
            <TableHead className="font-semibold text-zinc-100">Status</TableHead>
            <TableHead className="font-semibold text-zinc-100">Views</TableHead>
            <TableHead className="text-right font-semibold text-zinc-100">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => {
            const isSelected = selectedPosts.includes(post.id);
            const isDeleting = deletingPosts.includes(post.id);
            
            return (
              <TableRow 
                key={post.id} 
                className={`
                  transition-all duration-200 border-b border-zinc-800/50
                  ${isSelected ? 'bg-[#ff0abe]/5 hover:bg-[#ff0abe]/10' : 'hover:bg-zinc-800/50'}
                  ${isDeleting ? 'opacity-50' : ''}
                `}
              >
                <TableCell className="w-12">
                  <Checkbox 
                    checked={isSelected}
                    onCheckedChange={(checked) => handleSelectPost(post.id, checked as boolean)}
                    aria-label={`Select post ${post.title}`}
                    className="translate-y-[2px] data-[state=checked]:bg-[#ff0abe] data-[state=checked]:border-[#ff0abe]"
                    disabled={isDeleting}
                  />
                </TableCell>
                <TableCell className={`font-medium ${isSelected ? 'text-[#ff0abe]' : 'text-zinc-100'}`}>
                  {post.title}
                </TableCell>
                <TableCell className="text-zinc-400">
                  {post.updated_at ? format(new Date(post.updated_at), 'MMM dd, yyyy') : 'N/A'}
                </TableCell>
                <TableCell className="text-zinc-400">
                  {post.profiles?.display_name || post.profiles?.username || 'Unknown'}
                </TableCell>
                <TableCell>
                  {getStatusBadge(post.status)}
                </TableCell>
                <TableCell className="text-zinc-400">
                  {post.views_count || 0}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {}}
                      className={`h-8 w-8 ${isSelected ? 'text-[#ff0abe] hover:text-[#ff0abe]/80' : 'text-zinc-400 hover:text-[#41f0db] hover:bg-[#41f0db]/10'}`}
                      disabled={isDeleting}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`h-8 w-8 transition-colors ${isSelected ? 'text-[#ff0abe] hover:text-[#ff0abe]/80' : 'text-zinc-400 hover:text-[#ff0abe] hover:bg-[#ff0abe]/10'}`}
                          disabled={isDeleting}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-zinc-900 border border-zinc-800">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-zinc-100">Delete Post</AlertDialogTitle>
                          <AlertDialogDescription className="text-zinc-400">
                            Are you sure you want to delete this post? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="bg-transparent border border-zinc-800 text-zinc-100 hover:bg-zinc-800">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(post.id)}
                            className="bg-[#ff0abe] hover:bg-[#ff0abe]/80 text-white border-0"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {selectedPosts.length > 0 && (
        <div className="p-4 border-t border-zinc-800 bg-zinc-900/50">
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-400">
              {selectedPosts.length} {selectedPosts.length === 1 ? 'post' : 'posts'} selected
            </span>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  size="sm"
                  className="bg-[#ff0abe] hover:bg-[#ff0abe]/80 text-white border-0"
                >
                  Delete Selected
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-zinc-900 border border-zinc-800">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-zinc-100">Delete Selected Posts</AlertDialogTitle>
                  <AlertDialogDescription className="text-zinc-400">
                    Are you sure you want to delete {selectedPosts.length} {selectedPosts.length === 1 ? 'post' : 'posts'}? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-transparent border border-zinc-800 text-zinc-100 hover:bg-zinc-800">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleBulkDelete}
                    className="bg-[#ff0abe] hover:bg-[#ff0abe]/80 text-white border-0"
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
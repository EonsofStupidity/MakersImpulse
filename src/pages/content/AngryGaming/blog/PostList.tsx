import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Trash2 } from "lucide-react";
import { DeletePostsDialog } from "./DeletePostsDialog";
import { usePostDeletion } from "./hooks/usePostDeletion";

interface PostListProps {
  posts: any[];
  isLoading: boolean;
  onPostsDeleted?: () => void;
}

export const PostList = ({ posts, isLoading, onPostsDeleted }: PostListProps) => {
  const navigate = useNavigate();
  const {
    selectedPosts,
    showDeleteDialog,
    confirmDelete,
    postsToDelete,
    setShowDeleteDialog,
    setConfirmDelete,
    handleSelectPost,
    handleDeleteClick,
    handleConfirmDelete
  } = usePostDeletion(onPostsDeleted);

  if (isLoading) return <div>Loading posts...</div>;

  return (
    <div>
      {selectedPosts.length > 0 && (
        <div className="mb-4">
          <Button
            variant="destructive"
            onClick={() => handleDeleteClick(posts.filter(post => selectedPosts.includes(post.id)))}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Selected ({selectedPosts.length})
          </Button>
        </div>
      )}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={selectedPosts.length === posts.length && posts.length > 0}
                onCheckedChange={(checked) => {
                  if (checked) {
                    handleSelectPost(posts.map(post => post.id).join(','), true);
                  } else {
                    handleSelectPost('', false);
                  }
                }}
              />
            </TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Published</TableHead>
            <TableHead>Views</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow 
              key={post.id}
              className={`transition-colors ${
                selectedPosts.includes(post.id) 
                  ? "bg-blue-500/10 hover:bg-blue-500/20" 
                  : "hover:bg-muted/50"
              }`}
            >
              <TableCell>
                <Checkbox
                  checked={selectedPosts.includes(post.id)}
                  onCheckedChange={(checked) => handleSelectPost(post.id, checked as boolean)}
                />
              </TableCell>
              <TableCell>{post.title}</TableCell>
              <TableCell>
                <Badge variant={post.publication_status === "published" ? "default" : "secondary"}>
                  {post.publication_status}
                </Badge>
              </TableCell>
              <TableCell>
                {format(new Date(post.created_at), "MMM d, yyyy")}
              </TableCell>
              <TableCell>
                {post.published_at ? format(new Date(post.published_at), "MMM d, yyyy") : "-"}
              </TableCell>
              <TableCell>{post.views_count}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    onClick={() => navigate(`/admin/blog/edit/${post.id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-destructive"
                    onClick={() => handleDeleteClick([post])}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <DeletePostsDialog
        isOpen={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        postsToDelete={postsToDelete}
        onConfirm={handleConfirmDelete}
        confirmDelete={confirmDelete}
        setConfirmDelete={setConfirmDelete}
      />
    </div>
  );
};
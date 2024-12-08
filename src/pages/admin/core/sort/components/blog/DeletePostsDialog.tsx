import { Checkbox } from "@/components/ui/checkbox";
import { ConfirmActionDialog } from "@/components/admin/roles/components/ConfirmActionDialog";

interface DeletePostsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  postsToDelete: any[];
  onConfirm: () => void;
  confirmDelete: boolean;
  setConfirmDelete: (value: boolean) => void;
}

export const DeletePostsDialog = ({
  isOpen,
  onOpenChange,
  postsToDelete,
  onConfirm,
  confirmDelete,
  setConfirmDelete,
}: DeletePostsDialogProps) => {
  return (
    <ConfirmActionDialog
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="Delete Posts"
      description={
        <>
          <p className="mb-4">You are about to delete the following posts:</p>
          <ul className="list-disc pl-4 mb-4">
            {postsToDelete.map(post => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="confirm-delete"
              checked={confirmDelete}
              onCheckedChange={(checked) => setConfirmDelete(checked as boolean)}
            />
            <label htmlFor="confirm-delete">
              I understand that I am permanently deleting these posts
            </label>
          </div>
        </>
      }
      confirmText="Delete"
      onConfirm={onConfirm}
      variant="destructive"
    />
  );
};
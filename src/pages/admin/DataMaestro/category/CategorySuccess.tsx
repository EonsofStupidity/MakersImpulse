import { Button } from "@/components/ui/button";
import { FolderTree, Plus } from "lucide-react";

interface CategorySuccessProps {
  onReset: () => void;
}

export const CategorySuccess = ({ onReset }: CategorySuccessProps) => {
  return (
    <div className="text-center space-y-4">
      <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
        <FolderTree className="h-8 w-8 text-green-600 dark:text-green-50" />
      </div>
      <h3 className="text-lg font-semibold">Category Created Successfully</h3>
      <p className="text-muted-foreground">
        Your new category has been created and is ready to use
      </p>
      <Button
        type="button"
        onClick={onReset}
        className="w-full"
      >
        <Plus className="mr-2 h-4 w-4" /> Create Another Category
      </Button>
    </div>
  );
};
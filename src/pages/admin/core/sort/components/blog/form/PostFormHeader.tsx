import { Button } from "@/components/ui/button";
import { Eye, Save } from "lucide-react";

interface PostFormHeaderProps {
  isPreview: boolean;
  onPreviewToggle: () => void;
  onSaveDraft: () => void;
  onPublish: () => void;
}

export const PostFormHeader = ({
  isPreview,
  onPreviewToggle,
  onSaveDraft,
  onPublish
}: PostFormHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-3xl font-bold">Create New Post</h1>
      <div className="space-x-2">
        <Button
          variant="outline"
          onClick={onPreviewToggle}
        >
          <Eye className="w-4 h-4 mr-2" />
          {isPreview ? "Edit" : "Preview"}
        </Button>
        <Button onClick={onSaveDraft}>
          <Save className="w-4 h-4 mr-2" />
          Save Draft
        </Button>
        <Button onClick={onPublish} variant="default">
          Publish
        </Button>
      </div>
    </div>
  );
};
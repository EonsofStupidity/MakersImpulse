import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BuilderPage } from "@/types/builder";

interface BuilderHeaderProps {
  page: BuilderPage;
  previewMode: boolean;
  onPreviewToggle: () => void;
  onPublishToggle: () => void;
}

const BuilderHeader = ({ 
  page, 
  previewMode, 
  onPreviewToggle, 
  onPublishToggle 
}: BuilderHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">Page Builder</h1>
      <div className="space-x-2">
        <Button
          variant="outline"
          onClick={onPreviewToggle}
        >
          <Eye className="w-4 h-4 mr-2" />
          {previewMode ? "Exit Preview" : "Preview"}
        </Button>
        <Button
          onClick={onPublishToggle}
        >
          {page.is_published ? "Unpublish" : "Publish"}
        </Button>
      </div>
    </div>
  );
};

export default BuilderHeader;
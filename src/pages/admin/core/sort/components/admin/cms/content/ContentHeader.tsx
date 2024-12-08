import { Button } from "@/components/ui/button";
import { PlusCircle, Save, Image } from "lucide-react";

interface ContentHeaderProps {
  selectedItems: string[];
  onBulkPublish: () => void;
  onShowMediaLibrary: () => void;
}

const ContentHeader = ({ 
  selectedItems, 
  onBulkPublish, 
  onShowMediaLibrary 
}: ContentHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">Content</h2>
      <div className="space-x-2">
        <Button
          variant="outline"
          onClick={onShowMediaLibrary}
        >
          <Image className="w-4 h-4 mr-2" />
          Media Library
        </Button>
        <Button
          variant="secondary"
          onClick={onBulkPublish}
          disabled={selectedItems.length === 0}
        >
          <Save className="w-4 h-4 mr-2" />
          Publish Selected
        </Button>
        <Button>
          <PlusCircle className="w-4 h-4 mr-2" />
          New Content
        </Button>
      </div>
    </div>
  );
};

export default ContentHeader;
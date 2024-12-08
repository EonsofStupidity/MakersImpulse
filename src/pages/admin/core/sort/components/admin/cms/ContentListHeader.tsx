import { PlusCircle, Save, Image } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContentListHeaderProps {
  selectedItems: string[];
  onBulkPublish: () => void;
  onShowMediaLibrary: () => void;
  onNewContent: () => void;
}

const ContentListHeader = ({ 
  selectedItems, 
  onBulkPublish, 
  onShowMediaLibrary,
  onNewContent 
}: ContentListHeaderProps) => {
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
        <Button onClick={onNewContent}>
          <PlusCircle className="w-4 h-4 mr-2" />
          New Content
        </Button>
      </div>
    </div>
  );
};

export default ContentListHeader;
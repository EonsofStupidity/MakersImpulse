import { Button } from "@/components/ui/button";
import { Trash2, Copy, Settings } from "lucide-react";
import { BuilderElement } from "@/types/builder";

interface ElementToolbarProps {
  element: BuilderElement;
  onDelete: () => void;
}

const ElementToolbar = ({ element, onDelete }: ElementToolbarProps) => {
  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm">
        <Settings className="w-4 h-4" />
      </Button>
      <Button variant="ghost" size="sm">
        <Copy className="w-4 h-4" />
      </Button>
      <Button variant="ghost" size="sm" onClick={onDelete}>
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default ElementToolbar;
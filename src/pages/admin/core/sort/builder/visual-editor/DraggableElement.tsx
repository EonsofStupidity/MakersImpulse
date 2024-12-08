import { motion, Reorder, useDragControls } from "framer-motion";
import { GripVertical, Settings, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DraggableElementProps {
  id: string;
  type: string;
  content: any;
  onRemove: (id: string) => void;
  onEdit: (id: string) => void;
}

const DraggableElement = ({ id, type, content, onRemove, onEdit }: DraggableElementProps) => {
  const controls = useDragControls();

  return (
    <Reorder.Item
      value={id}
      dragListener={false}
      dragControls={controls}
      className="relative group"
    >
      <motion.div
        className="border rounded-lg p-4 mb-2 bg-background hover:shadow-md transition-shadow"
        whileHover={{ scale: 1.01 }}
        layout
      >
        <div className="absolute -left-10 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div
            className="cursor-grab active:cursor-grabbing p-2"
            onPointerDown={(e) => controls.start(e)}
          >
            <GripVertical className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>

        <div className="absolute -right-10 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(id)}
                className="p-2 h-auto"
              >
                <Settings className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Edit element</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemove(id)}
                className="p-2 h-auto text-destructive"
              >
                <Trash className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Remove element</TooltipContent>
          </Tooltip>
        </div>

        <div className="preview-content">
          {/* Render different content based on element type */}
          {type === 'text' && <div>{content.text}</div>}
          {type === 'image' && (
            <img 
              src={content.url} 
              alt={content.alt || ''} 
              className="max-w-full h-auto"
            />
          )}
          {/* Add more element type renderers as needed */}
        </div>
      </motion.div>
    </Reorder.Item>
  );
};

export default DraggableElement;
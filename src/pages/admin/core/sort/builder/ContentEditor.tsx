import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, GripVertical, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ContentEditorProps {
  content: any;
  onChange: (content: any) => void;
}

const BLOCK_TYPES = {
  text: "Text Block",
  image: "Image",
  gallery: "Gallery",
  video: "Video",
  button: "Button",
};

const ContentEditor = ({ content, onChange }: ContentEditorProps) => {
  const [blocks, setBlocks] = useState(content.blocks || []);

  const addBlock = (type: keyof typeof BLOCK_TYPES) => {
    const newBlock = {
      id: `block-${Date.now()}`,
      type,
      content: {},
    };
    const newBlocks = [...blocks, newBlock];
    setBlocks(newBlocks);
    onChange({ ...content, blocks: newBlocks });
  };

  const removeBlock = (index: number) => {
    const newBlocks = blocks.filter((_, i) => i !== index);
    setBlocks(newBlocks);
    onChange({ ...content, blocks: newBlocks });
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(blocks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setBlocks(items);
    onChange({ ...content, blocks: items });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {Object.entries(BLOCK_TYPES).map(([type, label]) => (
          <Button
            key={type}
            variant="outline"
            size="sm"
            onClick={() => addBlock(type as keyof typeof BLOCK_TYPES)}
          >
            <Plus className="w-4 h-4 mr-2" />
            {label}
          </Button>
        ))}
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="blocks">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-2"
            >
              <AnimatePresence>
                {blocks.map((block, index) => (
                  <Draggable
                    key={block.id}
                    draggableId={block.id}
                    index={index}
                  >
                    {(provided) => (
                      <motion.div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                      >
                        <Card className="p-4">
                          <div className="flex items-center justify-between">
                            <div
                              {...provided.dragHandleProps}
                              className="flex items-center gap-2"
                            >
                              <GripVertical className="w-4 h-4 text-muted-foreground" />
                              <span>{BLOCK_TYPES[block.type as keyof typeof BLOCK_TYPES]}</span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeBlock(index)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </Card>
                      </motion.div>
                    )}
                  </Draggable>
                ))}
              </AnimatePresence>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ContentEditor;
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reorder } from "framer-motion";
import DraggableElement from "../visual-editor/DraggableElement";
import { BuilderElement } from "@/types/builder";

interface ElementListProps {
  elements: BuilderElement[];
  onChange: (elements: BuilderElement[]) => void;
}

const ElementList = ({ elements, onChange }: ElementListProps) => {
  const handleAddElement = (type: string) => {
    const newElement: BuilderElement = {
      id: `element-${Date.now()}`,
      type,
      content: type === 'text' ? { text: 'New text element' } : {}
    };
    
    onChange([...elements, newElement]);
  };

  const handleRemoveElement = (id: string) => {
    onChange(elements.filter(el => el.id !== id));
  };

  const handleEditElement = (id: string) => {
    // Implement element editing logic
    console.log("Edit element:", id);
  };

  return (
    <>
      <div className="mb-4 flex gap-2">
        <Button onClick={() => handleAddElement('text')} variant="outline">
          <Plus className="w-4 h-4 mr-2" />
          Add Text
        </Button>
        <Button onClick={() => handleAddElement('image')} variant="outline">
          <Plus className="w-4 h-4 mr-2" />
          Add Image
        </Button>
      </div>
      
      <Reorder.Group
        axis="y"
        values={elements}
        onReorder={onChange}
        className="space-y-2 relative"
      >
        {elements.map((element) => (
          <DraggableElement
            key={element.id}
            {...element}
            onRemove={handleRemoveElement}
            onEdit={handleEditElement}
          />
        ))}
      </Reorder.Group>
    </>
  );
};

export default ElementList;
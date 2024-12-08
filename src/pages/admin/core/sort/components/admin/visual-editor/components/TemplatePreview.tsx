import { Card } from "@/components/ui/card";
import { BuilderElement } from "@/types/builder";
import { motion } from "framer-motion";

interface TemplatePreviewProps {
  elements: BuilderElement[];
  gridEnabled: boolean;
  gridColumns: number;
}

export const TemplatePreview = ({
  elements,
  gridEnabled,
  gridColumns,
}: TemplatePreviewProps) => {
  const renderElement = (element: BuilderElement) => {
    switch (element.type) {
      case "container":
        return (
          <div style={element.styles} className="border border-dashed border-gray-300">
            <div className="text-sm text-gray-500">Container</div>
          </div>
        );
      case "section":
        return (
          <div style={element.styles} className="border-2 border-dashed border-gray-400">
            <div className="text-sm text-gray-500">Section</div>
          </div>
        );
      case "columns":
        return (
          <div style={element.styles} className="border border-dashed border-gray-300">
            {Array.from({ length: element.columns || 2 }).map((_, i) => (
              <div key={i} className="border-r last:border-r-0 border-dashed border-gray-300">
                <div className="text-sm text-gray-500">Column {i + 1}</div>
              </div>
            ))}
          </div>
        );
      case "text":
        return <div style={element.styles}>{element.content.text || "Text Block"}</div>;
      case "image":
        return element.content.url ? (
          <img
            src={element.content.url}
            alt={element.content.alt || ""}
            style={element.styles}
            className="max-w-full h-auto rounded"
          />
        ) : (
          <div className="bg-gray-100 p-4 rounded">
            <div className="text-sm text-gray-500">Image Placeholder</div>
          </div>
        );
      default:
        return <div>Unknown element type: {element.type}</div>;
    }
  };

  return (
    <Card className="p-6 relative">
      {gridEnabled && (
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="h-full grid gap-px bg-primary/5"
            style={{ 
              gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))` 
            }}
          >
            {Array.from({ length: gridColumns }).map((_, i) => (
              <div
                key={i}
                className="border-r border-primary/10 last:border-r-0"
              />
            ))}
          </div>
        </div>
      )}
      
      <div className="space-y-4 relative">
        {elements.map((element) => (
          <motion.div
            key={element.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderElement(element)}
          </motion.div>
        ))}
      </div>
    </Card>
  );
};
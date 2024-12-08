import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Minus, Pen } from "lucide-react";

interface Annotation {
  x: number;
  y: number;
  text: string;
}

interface ImageAnnotatorProps {
  imageUrl: string;
  annotations: { [key: string]: Annotation };
  onAnnotationsUpdate: (annotations: { [key: string]: Annotation }) => void;
}

export const ImageAnnotator = ({
  imageUrl,
  annotations,
  onAnnotationsUpdate,
}: ImageAnnotatorProps) => {
  const [currentAnnotation, setCurrentAnnotation] = useState<string | null>(null);
  const [isAnnotating, setIsAnnotating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleImageClick = (e: React.MouseEvent) => {
    if (!isAnnotating || !containerRef.current || !imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const newAnnotationId = Date.now().toString();
    const updatedAnnotations = {
      ...annotations,
      [newAnnotationId]: { x, y, text: "" },
    };
    onAnnotationsUpdate(updatedAnnotations);
    setCurrentAnnotation(newAnnotationId);
  };

  const handleAnnotationTextChange = (id: string, text: string) => {
    const updatedAnnotations = {
      ...annotations,
      [id]: { ...annotations[id], text },
    };
    onAnnotationsUpdate(updatedAnnotations);
  };

  const handleRemoveAnnotation = (id: string) => {
    const { [id]: removed, ...updatedAnnotations } = annotations;
    onAnnotationsUpdate(updatedAnnotations);
    setCurrentAnnotation(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Button
          variant={isAnnotating ? "default" : "outline"}
          size="sm"
          onClick={() => setIsAnnotating(!isAnnotating)}
        >
          <Pen className="h-4 w-4 mr-2" />
          {isAnnotating ? "Finish Annotating" : "Add Annotation"}
        </Button>
      </div>

      <div
        ref={containerRef}
        className="relative border rounded-lg overflow-hidden cursor-crosshair"
        style={{ maxWidth: "100%", maxHeight: "600px" }}
      >
        <img
          ref={imageRef}
          src={imageUrl}
          alt="Annotatable image"
          className="w-full h-auto"
          onClick={handleImageClick}
        />
        {Object.entries(annotations).map(([id, annotation]) => (
          <div
            key={id}
            className="absolute"
            style={{
              left: `${annotation.x}%`,
              top: `${annotation.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div
              className={`w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center cursor-pointer ${
                currentAnnotation === id ? "ring-2 ring-offset-2" : ""
              }`}
              onClick={() => setCurrentAnnotation(id)}
            >
              {Object.keys(annotations).indexOf(id) + 1}
            </div>
          </div>
        ))}
      </div>

      {currentAnnotation && (
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Input
              value={annotations[currentAnnotation].text}
              onChange={(e) =>
                handleAnnotationTextChange(currentAnnotation, e.target.value)
              }
              placeholder="Enter annotation text"
            />
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleRemoveAnnotation(currentAnnotation)}
            >
              <Minus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
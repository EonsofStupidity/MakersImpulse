import { Button } from "@/components/ui/button";
import { Wand } from "lucide-react";

interface AutoMapButtonProps {
  onAutoMap: () => void;
  className?: string;
}

export const AutoMapButton = ({ onAutoMap, className }: AutoMapButtonProps) => {
  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={onAutoMap}
      className={`flex items-center gap-2 ${className}`}
    >
      <Wand className="h-4 w-4" />
      Auto-map Fields
    </Button>
  );
};
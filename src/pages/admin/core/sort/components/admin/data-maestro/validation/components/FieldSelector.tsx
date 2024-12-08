import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ListChecks, ArrowRight, ArrowLeft } from "lucide-react";

interface FieldSelectorProps {
  availableFields: string[];
  selectedFields: string[];
  onUpdateSelection: (selected: string[]) => void;
}

export const FieldSelector = ({
  availableFields,
  selectedFields,
  onUpdateSelection,
}: FieldSelectorProps) => {
  const [selectedAvailable, setSelectedAvailable] = useState<string[]>([]);
  const [selectedChosen, setSelectedChosen] = useState<string[]>([]);

  const moveToChosen = () => {
    const newSelected = [...selectedFields, ...selectedAvailable];
    onUpdateSelection(newSelected);
    setSelectedAvailable([]);
  };

  const moveToAvailable = () => {
    const newSelected = selectedFields.filter(
      (field) => !selectedChosen.includes(field)
    );
    onUpdateSelection(newSelected);
    setSelectedChosen([]);
  };

  return (
    <div className="grid grid-cols-[1fr,auto,1fr] gap-4">
      <Card className="p-4">
        <h4 className="font-medium mb-2">Available Fields</h4>
        <div className="space-y-1">
          {availableFields
            .filter((field) => !selectedFields.includes(field))
            .map((field) => (
              <div
                key={field}
                className={`p-2 rounded cursor-pointer ${
                  selectedAvailable.includes(field)
                    ? "bg-primary/10"
                    : "hover:bg-muted"
                }`}
                onClick={() => {
                  setSelectedAvailable((prev) =>
                    prev.includes(field)
                      ? prev.filter((f) => f !== field)
                      : [...prev, field]
                  );
                }}
              >
                {field}
              </div>
            ))}
        </div>
      </Card>

      <div className="flex flex-col justify-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={moveToChosen}
          disabled={selectedAvailable.length === 0}
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={moveToAvailable}
          disabled={selectedChosen.length === 0}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
      </div>

      <Card className="p-4">
        <h4 className="font-medium mb-2">Selected Fields</h4>
        <div className="space-y-1">
          {selectedFields.map((field) => (
            <div
              key={field}
              className={`p-2 rounded cursor-pointer ${
                selectedChosen.includes(field)
                  ? "bg-primary/10"
                  : "hover:bg-muted"
              }`}
              onClick={() => {
                setSelectedChosen((prev) =>
                  prev.includes(field)
                    ? prev.filter((f) => f !== field)
                    : [...prev, field]
                );
              }}
            >
              {field}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
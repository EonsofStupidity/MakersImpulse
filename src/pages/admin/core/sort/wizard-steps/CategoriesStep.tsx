import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";

interface CategoriesStepProps {
  data: string[];
  onUpdate: (data: string[]) => void;
}

const CategoriesStep = ({ data, onUpdate }: CategoriesStepProps) => {
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    if (newCategory && !data.includes(newCategory)) {
      onUpdate([...data, newCategory]);
      setNewCategory("");
    }
  };

  const handleRemoveCategory = (category: string) => {
    onUpdate(data.filter((c) => c !== category));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Categories & Tags</h3>
      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Add a category"
            onKeyPress={(e) => e.key === "Enter" && handleAddCategory()}
          />
          <Button onClick={handleAddCategory}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {data.map((category) => (
            <Badge key={category} variant="secondary" className="flex items-center gap-1">
              {category}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => handleRemoveCategory(category)}
              />
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesStep;
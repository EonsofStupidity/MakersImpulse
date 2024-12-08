import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tag, Plus, X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface TagSystemProps {
  tags: string[];
  onUpdateTags: (tags: string[]) => void;
  suggestions?: string[];
}

export const TagSystem = ({ tags, onUpdateTags, suggestions = [] }: TagSystemProps) => {
  const [newTag, setNewTag] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      onUpdateTags([...tags, newTag]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    onUpdateTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleInputChange = (value: string) => {
    setNewTag(value);
    setShowSuggestions(value.length > 0);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Tag className="h-4 w-4" />
        <span className="font-medium">Field Tags</span>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            value={newTag}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Add a tag"
            onKeyPress={(e) => e.key === 'Enter' && addTag()}
            className="w-full"
          />
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-background border rounded-md shadow-lg">
              {suggestions
                .filter(s => s.toLowerCase().includes(newTag.toLowerCase()))
                .map((suggestion) => (
                  <div
                    key={suggestion}
                    className="px-3 py-2 hover:bg-muted cursor-pointer"
                    onClick={() => {
                      setNewTag(suggestion);
                      setShowSuggestions(false);
                    }}
                  >
                    {suggestion}
                  </div>
                ))}
            </div>
          )}
        </div>
        <Button onClick={addTag} size="icon" variant="outline">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {tags.length === 0 && (
        <Alert variant="default" className="bg-muted/50">
          <AlertDescription>
            Add tags to help organize and categorize your fields
          </AlertDescription>
        </Alert>
      )}

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge 
            key={tag} 
            variant="secondary" 
            className="flex items-center gap-1 px-2 py-1"
          >
            {tag}
            <X
              className="h-3 w-3 cursor-pointer hover:text-destructive"
              onClick={() => removeTag(tag)}
            />
          </Badge>
        ))}
      </div>
    </div>
  );
};
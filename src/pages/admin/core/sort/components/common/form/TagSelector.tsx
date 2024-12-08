import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, X } from 'lucide-react';

export interface TagSelectorProps {
  selectedTags: string[];
  onChange: (tags: string[]) => void;
  maxTags?: number;
  suggestions?: string[];
  placeholder?: string;
}

export const TagSelector = ({ 
  selectedTags = [], 
  onChange, 
  maxTags = 5,
  suggestions = [],
  placeholder = "Add a tag..."
}: TagSelectorProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleAddTag = () => {
    if (inputValue.trim() && selectedTags.length < maxTags) {
      const newTag = inputValue.trim();
      if (!selectedTags.includes(newTag)) {
        onChange([...selectedTags, newTag]);
      }
      setInputValue('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onChange(selectedTags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {selectedTags.map(tag => (
          <Badge 
            key={tag} 
            variant="secondary"
            className="px-2 py-1 flex items-center gap-1"
          >
            {tag}
            <Button
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 hover:bg-transparent"
              onClick={() => handleRemoveTag(tag)}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
      </div>

      <div className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          disabled={selectedTags.length >= maxTags}
        />
        <Button 
          onClick={handleAddTag}
          disabled={selectedTags.length >= maxTags || !inputValue.trim()}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add
        </Button>
      </div>

      {suggestions && suggestions.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {suggestions
            .filter(tag => !selectedTags.includes(tag))
            .map(tag => (
              <Badge
                key={tag}
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                onClick={() => {
                  if (selectedTags.length < maxTags) {
                    onChange([...selectedTags, tag]);
                  }
                }}
              >
                {tag}
              </Badge>
            ))}
        </div>
      )}
    </div>
  );
};
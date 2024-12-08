import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

interface TagPreviewProps {
  tags: { name: string; count: number }[];
  onRemoveTag: (tag: string) => void;
}

export const TagPreview = ({ tags, onRemoveTag }: TagPreviewProps) => {
  return (
    <Card className="p-4 space-y-4">
      <Label>Generated Tags Preview</Label>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge
            key={tag.name}
            variant="secondary"
            className="flex items-center gap-1"
          >
            {tag.name} ({tag.count})
            <X
              className="h-3 w-3 cursor-pointer hover:text-destructive"
              onClick={() => onRemoveTag(tag.name)}
            />
          </Badge>
        ))}
      </div>
      {tags.length === 0 && (
        <p className="text-sm text-muted-foreground">
          No tags generated yet. Configure the rules above and import data to
          generate tags.
        </p>
      )}
    </Card>
  );
};
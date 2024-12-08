import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface PostTagsProps {
  onSelectTag: (tag: string) => void;
}

export const PostTags = ({ onSelectTag }: PostTagsProps) => {
  const predefinedTags = [
    "3D Printer",
    "Tech",
    "Reviews", 
    "News",
    "Site Update"
  ];

  return (
    <Card className="w-[40%] p-3">
      <div className="flex flex-wrap gap-2">
        {predefinedTags.map((tag) => (
          <Badge
            key={tag}
            variant="outline"
            className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
            onClick={() => onSelectTag(tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>
    </Card>
  );
};
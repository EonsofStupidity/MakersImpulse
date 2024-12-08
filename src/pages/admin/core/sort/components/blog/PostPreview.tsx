import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PostPreviewProps {
  title: string;
  content: string;
  excerpt?: string;
  tags: string[];
  category: string;
  featuredImage: string | null;
}

export const PostPreview = ({
  title,
  content,
  excerpt,
  tags,
  category,
  featuredImage,
}: PostPreviewProps) => {
  return (
    <Card className="p-6 space-y-6">
      {featuredImage && (
        <img
          src={featuredImage}
          alt={title}
          className="w-full h-64 object-cover rounded-lg"
        />
      )}

      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{title}</h1>

        {excerpt && (
          <p className="text-muted-foreground">{excerpt}</p>
        )}

        <div className="flex gap-2">
          {category && <Badge variant="secondary">{category}</Badge>}
          {tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>

        <div
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </Card>
  );
};
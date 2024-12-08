import { Card } from "@/components/ui/card";

interface ContentPreviewProps {
  title: string;
  content: string;
}

export default function ContentPreview({ title, content }: ContentPreviewProps) {
  return (
    <Card className="p-6">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>
      <div 
        className="prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </Card>
  );
}
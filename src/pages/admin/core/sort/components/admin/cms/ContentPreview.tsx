import { Card } from "@/components/ui/card";

interface ContentPreviewProps {
  content: string;
  layout: string;
}

const ContentPreview = ({ content, layout }: ContentPreviewProps) => {
  const getLayoutClasses = () => {
    switch (layout) {
      case "two-column":
        return "columns-2 gap-8";
      case "full-width":
        return "max-w-none";
      default:
        return "max-w-2xl mx-auto";
    }
  };

  return (
    <Card className="p-6">
      <div className={`prose dark:prose-invert ${getLayoutClasses()}`}>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </Card>
  );
};

export default ContentPreview;
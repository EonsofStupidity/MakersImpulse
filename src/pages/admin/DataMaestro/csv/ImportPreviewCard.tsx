import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ImportPreviewCardProps {
  data: any;
  type: 'part' | 'build' | 'blog';
}

const ImportPreviewCard = ({ data, type }: ImportPreviewCardProps) => {
  const renderPartPreview = () => (
    <div className="space-y-4">
      {data.image_url && (
        <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100">
          <img
            src={data.image_url}
            alt={data.name}
            className="object-cover w-full h-full"
          />
        </div>
      )}
      <div>
        <h3 className="text-xl font-bold">{data.name}</h3>
        <p className="text-sm text-muted-foreground">{data.manufacturer}</p>
      </div>
      <div className="flex gap-2">
        <Badge variant="secondary">${data.cost_usd}</Badge>
        <Badge variant="outline">{data.category}</Badge>
      </div>
      <p className="text-sm">{data.summary}</p>
    </div>
  );

  const renderBuildPreview = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">{data.printer_name}</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium">Build Volume</p>
          <p className="text-sm text-muted-foreground">
            {data.build_volume?.x}x{data.build_volume?.y}x{data.build_volume?.z}mm
          </p>
        </div>
        <div>
          <p className="text-sm font-medium">Kinematics</p>
          <p className="text-sm text-muted-foreground">{data.kinematics}</p>
        </div>
      </div>
      <p className="text-sm">{data.description}</p>
    </div>
  );

  const renderBlogPreview = () => (
    <div className="prose dark:prose-invert max-w-none">
      <h1>{data.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: data.content }} />
    </div>
  );

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Preview</h3>
      {type === 'part' && renderPartPreview()}
      {type === 'build' && renderBuildPreview()}
      {type === 'blog' && renderBlogPreview()}
    </Card>
  );
};

export default ImportPreviewCard;
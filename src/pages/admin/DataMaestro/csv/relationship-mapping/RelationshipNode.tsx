import { Handle, Position } from 'reactflow';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RelationshipNodeProps {
  data: {
    label: string;
    fields: string[];
    isPrimary?: boolean;
  };
}

export const RelationshipNode = ({ data }: RelationshipNodeProps) => {
  return (
    <Card className="px-4 py-2 min-w-[200px] relative">
      <div className="font-bold border-b pb-2 flex items-center justify-between">
        {data.label}
        {data.isPrimary && (
          <Badge variant="secondary" className="ml-2">Primary</Badge>
        )}
      </div>
      <div className="py-2">
        {data.fields.map((field, index) => (
          <div key={index} className="text-sm py-1 flex items-center gap-2">
            {field}
          </div>
        ))}
      </div>
      <Handle type="source" position={Position.Right} className="!bg-primary" />
      <Handle type="target" position={Position.Left} className="!bg-primary" />
    </Card>
  );
};
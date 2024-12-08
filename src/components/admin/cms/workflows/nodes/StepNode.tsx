import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { Card } from "@/components/ui/card";

interface StepNodeProps {
  data: { 
    label: string;
    description?: string;
  };
}

export const StepNode = memo(({ data }: StepNodeProps) => {
  return (
    <Card className="px-4 py-2 min-w-[150px]">
      <Handle type="target" position={Position.Top} />
      <div className="space-y-1">
        <div className="font-medium">{data.label}</div>
        {data.description && (
          <div className="text-sm text-muted-foreground">{data.description}</div>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </Card>
  );
});

StepNode.displayName = 'StepNode';
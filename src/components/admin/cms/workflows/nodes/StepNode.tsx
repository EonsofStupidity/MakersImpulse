import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { Card } from "@/components/ui/card";

export const StepNode = memo(({ data }: { data: { label: string } }) => {
  return (
    <Card className="px-4 py-2 min-w-[150px]">
      <Handle type="target" position={Position.Top} />
      <div className="font-medium">{data.label}</div>
      <Handle type="source" position={Position.Bottom} />
    </Card>
  );
});

StepNode.displayName = 'StepNode';
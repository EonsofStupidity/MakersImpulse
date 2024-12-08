import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const ConditionNode = memo(({ data }: { data: { condition: string } }) => {
  return (
    <Card className="px-4 py-2 min-w-[200px]">
      <Handle type="target" position={Position.Top} />
      <div className="space-y-2">
        <div className="font-medium">Condition</div>
        <Input 
          value={data.condition} 
          onChange={(e) => {
            data.condition = e.target.value;
          }}
          placeholder="Enter condition..."
        />
      </div>
      <Handle type="source" position={Position.Bottom} id="true" />
      <Handle 
        type="source" 
        position={Position.Right} 
        id="false"
        style={{ top: '50%' }}
      />
    </Card>
  );
});

ConditionNode.displayName = 'ConditionNode';
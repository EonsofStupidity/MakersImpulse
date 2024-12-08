import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { KeyRound, Bell, CheckSquare, GitBranch } from "lucide-react";

interface WorkflowStepNodeProps {
  data: {
    name: string;
    type: string;
    configuration?: Record<string, any>;
  };
}

const getStepIcon = (type: string) => {
  switch (type) {
    case 'user_input':
      return KeyRound;
    case 'approval':
      return CheckSquare;
    case 'notification':
      return Bell;
    case 'condition':
      return GitBranch;
    default:
      return KeyRound;
  }
};

export const WorkflowStepNode = memo(({ data }: WorkflowStepNodeProps) => {
  const Icon = getStepIcon(data.type);

  return (
    <Card className="px-4 py-2 min-w-[200px]">
      <Handle type="target" position={Position.Top} />
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4" />
          <div className="font-medium">{data.name}</div>
        </div>
        <div className="text-sm text-muted-foreground">{data.type}</div>
      </div>
      {data.type === 'condition' ? (
        <>
          <Handle 
            type="source" 
            position={Position.Bottom} 
            id="true"
            style={{ left: '25%' }}
          />
          <Handle 
            type="source" 
            position={Position.Bottom} 
            id="false"
            style={{ left: '75%' }}
          />
        </>
      ) : (
        <Handle type="source" position={Position.Bottom} />
      )}
    </Card>
  );
});

WorkflowStepNode.displayName = 'WorkflowStepNode';
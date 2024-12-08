import { useState, useCallback } from 'react';
import ReactFlow, {
  Controls,
  Background,
  Connection,
  Edge,
  Node,
  addEdge,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { StepNode } from '../workflow/StepNode';
import { ConditionNode } from '../workflow/ConditionNode';
import 'reactflow/dist/style.css';

const nodeTypes = {
  stepNode: StepNode,
  conditionNode: ConditionNode,
};

interface WorkflowVisualEditorProps {
  workflowId: string;
  initialNodes?: Node[];
  initialEdges?: Edge[];
  onSave: (nodes: Node[], edges: Edge[]) => void;
}

export const WorkflowVisualEditor = ({ workflowId, initialNodes = [], initialEdges = [], onSave }: WorkflowVisualEditorProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { toast } = useToast();

  const onConnect = useCallback((params: Connection) => {
    setEdges((eds) => addEdge({ ...params, animated: true }, eds));
  }, [setEdges]);

  const addStepNode = () => {
    const newNode = {
      id: `step-${nodes.length + 1}`,
      type: 'stepNode',
      data: { label: `Step ${nodes.length + 1}` },
      position: { x: 100, y: 100 * (nodes.length + 1) },
    };
    setNodes([...nodes, newNode]);
  };

  const addConditionNode = () => {
    const newNode = {
      id: `condition-${nodes.length + 1}`,
      type: 'conditionNode',
      data: { condition: 'true' },
      position: { x: 300, y: 100 * (nodes.length + 1) },
    };
    setNodes([...nodes, newNode]);
  };

  const handleSave = () => {
    onSave(nodes, edges);
    toast({
      title: "Workflow Saved",
      description: "Your workflow changes have been saved successfully.",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button onClick={addStepNode}>
          <Plus className="w-4 h-4 mr-2" />
          Add Step
        </Button>
        <Button variant="outline" onClick={addConditionNode}>
          <Plus className="w-4 h-4 mr-2" />
          Add Condition
        </Button>
        <Button variant="secondary" onClick={handleSave} className="ml-auto">
          Save Workflow
        </Button>
      </div>

      <Card className="h-[600px] w-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </Card>
    </div>
  );
};
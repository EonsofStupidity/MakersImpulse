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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { WorkflowStepNode } from './WorkflowStepNode';
import { StepTypeSelector } from './steps/StepTypeSelector';
import { StepConfigurationForm } from './steps/StepConfigurationForm';
import 'reactflow/dist/style.css';

const nodeTypes = {
  workflowStep: WorkflowStepNode,
};

interface WorkflowEditorProps {
  workflowId: string;
  initialNodes?: Node[];
  initialEdges?: Edge[];
  onSave: (nodes: Node[], edges: Edge[]) => void;
}

export const WorkflowEditor = ({ workflowId, initialNodes = [], initialEdges = [], onSave }: WorkflowEditorProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedStepType, setSelectedStepType] = useState('user_input');
  const { toast } = useToast();

  const onConnect = useCallback((params: Connection) => {
    setEdges((eds) => addEdge({ ...params, animated: true }, eds));
  }, [setEdges]);

  const handleAddStep = (formData: any) => {
    const newNode = {
      id: `step-${nodes.length + 1}`,
      type: 'workflowStep',
      data: {
        name: formData.name,
        type: selectedStepType,
        configuration: formData.configuration,
      },
      position: { x: 100, y: 100 * (nodes.length + 1) },
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
        <Sheet>
          <SheetTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Step
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Add Workflow Step</SheetTitle>
            </SheetHeader>
            <div className="py-4">
              <StepTypeSelector
                value={selectedStepType}
                onChange={setSelectedStepType}
              />
              <div className="mt-4">
                <StepConfigurationForm
                  stepType={selectedStepType}
                  onSubmit={handleAddStep}
                />
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <Button variant="secondary" onClick={handleSave}>
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
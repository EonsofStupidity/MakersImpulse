import { useCallback, useState, useEffect } from 'react';
import ReactFlow, {
  Controls,
  Background,
  Connection,
  addEdge,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { RelationshipNode } from './RelationshipNode';
import { supabase } from "@/integrations/supabase/client";
import { RelationshipVisualizerProps, SerializedVisualizationData } from './types';
import { useRelationshipLogic } from './useRelationshipLogic';
import 'reactflow/dist/style.css';

const nodeTypes = {
  tableNode: RelationshipNode,
};

export const RelationshipVisualizer = ({
  tables,
  relationships,
  onRelationshipChange,
  tableName
}: RelationshipVisualizerProps) => {
  const { toast } = useToast();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { checkCircularRelationship } = useRelationshipLogic(edges);

  useEffect(() => {
    const initialNodes = tables.map((table, index) => ({
      id: table.name,
      type: 'tableNode',
      data: { 
        label: table.name, 
        fields: table.fields,
        isPrimary: table.isPrimary 
      },
      position: { 
        x: 250 * Math.cos(2 * Math.PI * index / tables.length), 
        y: 250 * Math.sin(2 * Math.PI * index / tables.length) 
      },
    }));

    const initialEdges = relationships.map((rel, index) => ({
      id: `e${index}`,
      source: rel.source,
      target: rel.target,
      label: rel.type,
      animated: rel.type === 'many-to-many',
      type: 'smoothstep',
    }));

    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [tables, relationships, setNodes, setEdges]);

  const onConnect = useCallback(async (params: Connection) => {
    try {
      const hasCircular = checkCircularRelationship(edges, params);
      if (hasCircular) {
        toast({
          variant: "destructive",
          title: "Invalid Relationship",
          description: "Circular relationships are not allowed",
        });
        return;
      }

      const hasManyToMany = edges.some(
        edge => 
          (edge.source === params.source && edge.target === params.target) ||
          (edge.source === params.target && edge.target === params.source)
      );

      const newEdge = {
        ...params,
        id: `e${edges.length + 1}`,
        label: 'one-to-many',
        animated: false,
        type: 'smoothstep',
      };
      
      setEdges((eds) => addEdge(newEdge, eds));
      
      const newRelationships = [
        ...relationships,
        {
          source: params.source,
          target: params.target,
          type: 'one-to-many'
        }
      ];
      
      onRelationshipChange(newRelationships);

      // Prepare visualization data for Supabase
      const visualizationData: SerializedVisualizationData = {
        nodes: nodes.map(node => ({
          id: node.id,
          type: node.type,
          data: node.data,
          position: {
            x: node.position.x,
            y: node.position.y
          }
        })),
        edges: [...edges, newEdge].map(edge => ({
          id: edge.id || '',
          source: edge.source,
          target: edge.target,
          label: edge.label as string,
          animated: edge.animated,
          type: edge.type
        }))
      };

      const { error } = await supabase
        .from('relationship_visualizations')
        .insert({
          source_table: params.source,
          target_table: params.target,
          relationship_type: 'one-to-many',
          visualization_data: JSON.stringify(visualizationData)
        });

      if (error) throw error;

      if (hasManyToMany) {
        toast({
          variant: "destructive",
          title: "Warning",
          description: "This creates a many-to-many relationship. Consider using a junction table.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save relationship",
      });
    }
  }, [edges, nodes, relationships, onRelationshipChange, checkCircularRelationship, toast, setEdges]);

  return (
    <div className="space-y-4">
      <div className="h-[600px] border rounded-lg bg-background">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          className="bg-background"
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>

      {edges.some(edge => edge.animated) && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Many-to-Many Relationship Detected</AlertTitle>
          <AlertDescription>
            Consider using a junction table to properly handle many-to-many relationships.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
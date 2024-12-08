import ReactFlow, { 
  Node, 
  Edge, 
  Background, 
  Controls,
  MarkerType
} from 'reactflow';
import { Card } from "@/components/ui/card";
import { Database, Link2 } from "lucide-react";
import { motion } from "framer-motion";
import 'reactflow/dist/style.css';

interface ERDVisualizationProps {
  tables: {
    name: string;
    fields: { name: string; type: string }[];
  }[];
  relationships: {
    source: string;
    target: string;
    type: 'one-to-one' | 'one-to-many' | 'many-to-many';
  }[];
}

const TableNode = ({ data }: { data: any }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="bg-card p-4 rounded-lg shadow-lg min-w-[200px]"
  >
    <div className="flex items-center gap-2 border-b pb-2 mb-2">
      <Database className="h-4 w-4" />
      <span className="font-bold">{data.name}</span>
    </div>
    <div className="space-y-1">
      {data.fields.map((field: any, index: number) => (
        <div key={index} className="text-sm flex justify-between">
          <span>{field.name}</span>
          <span className="text-muted-foreground">{field.type}</span>
        </div>
      ))}
    </div>
  </motion.div>
);

const nodeTypes = {
  tableNode: TableNode,
};

export const ERDVisualization = ({ tables, relationships }: ERDVisualizationProps) => {
  const nodes: Node[] = tables.map((table, index) => ({
    id: table.name,
    type: 'tableNode',
    position: { 
      x: 250 * Math.cos(2 * Math.PI * index / tables.length), 
      y: 250 * Math.sin(2 * Math.PI * index / tables.length) 
    },
    data: table
  }));

  const edges: Edge[] = relationships.map((rel, index) => ({
    id: `e${index}`,
    source: rel.source,
    target: rel.target,
    type: 'smoothstep',
    animated: rel.type === 'many-to-many',
    label: rel.type,
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    style: { stroke: '#888' }
  }));

  return (
    <Card className="p-4">
      <div className="h-[600px]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          className="bg-background"
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </Card>
  );
};
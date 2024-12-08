import { useQuery } from "@tanstack/react-query";
import ReactFlow, {
  Background,
  Controls,
  Node,
  Edge,
  MarkerType,
} from 'reactflow';
import { Card } from "@/components/ui/card";
import { ERDNode } from './ERDNode';
import { ERDControls } from './ERDControls';
import { supabase } from "@/integrations/supabase/client";
import 'reactflow/dist/style.css';

interface SchemaInfo {
  table_name: string;
  columns: {
    name: string;
    type: string;
    is_nullable: string;
    default_value: string;
  }[];
  foreign_keys: {
    column_name: string;
    referenced_table: string;
    referenced_column: string;
  }[];
}

const nodeTypes = {
  tableNode: ERDNode,
};

const ERDVisualizer = () => {
  const { data: schemaInfo } = useQuery<SchemaInfo[]>({
    queryKey: ['schema-info'],
    queryFn: async () => {
      const { data, error } = await supabase
        .rpc('get_schema_info');
      
      if (error) throw error;
      return data as SchemaInfo[];
    }
  });

  const nodes: Node[] = schemaInfo?.map((table, index) => ({
    id: table.table_name,
    type: 'tableNode',
    position: { 
      x: 250 * Math.cos(2 * Math.PI * index / (schemaInfo?.length || 1)), 
      y: 250 * Math.sin(2 * Math.PI * index / (schemaInfo?.length || 1)) 
    },
    data: {
      tableName: table.table_name,
      columns: table.columns
    }
  })) || [];

  const edges: Edge[] = schemaInfo?.flatMap((table) => 
    (table.foreign_keys || []).map((fk, index) => ({
      id: `${table.table_name}-${fk.referenced_table}-${index}`,
      source: table.table_name,
      target: fk.referenced_table,
      type: 'smoothstep',
      animated: true,
      label: `${fk.column_name} → ${fk.referenced_column}`,
      markerEnd: { type: MarkerType.ArrowClosed },
    }))
  ) || [];

  return (
    <Card className="h-[800px] w-full">
      <ERDControls
        onLayoutChange={() => {}}
        onSaveLayout={() => {}}
        onToggleGrid={() => {}}
        showGrid={true}
      />
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
    </Card>
  );
};

export default ERDVisualizer;
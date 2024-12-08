import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import ReactFlow, { 
  Background, 
  Controls,
  Node,
  Edge,
  MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';
import { supabase } from "@/integrations/supabase/client";

interface SchemaTable {
  table_name: string;
  columns: Array<{
    name: string;
    type: string;
  }>;
  foreign_keys: Array<{
    column_name: string;
    referenced_table: string;
    referenced_column: string;
  }>;
}

const ERDNode = ({ data }: { data: any }) => (
  <div className="bg-card p-4 rounded-lg shadow min-w-[200px]">
    <div className="font-bold border-b pb-2 mb-2">{data.tableName}</div>
    <div className="space-y-1 text-sm">
      {data.columns.map((column: any, index: number) => (
        <div key={index} className="flex justify-between">
          <span>{column.name}</span>
          <span className="text-muted-foreground">{column.type}</span>
        </div>
      ))}
    </div>
  </div>
);

const nodeTypes = {
  tableNode: ERDNode,
};

const ERDVisualizer = () => {
  const { data: tables } = useQuery<SchemaTable[]>({
    queryKey: ["database-schema"],
    queryFn: async () => {
      const { data, error } = await supabase
        .rpc('get_schema_info');
      
      if (error) throw error;
      return data as SchemaTable[];
    },
  });

  const nodes: Node[] = (tables || []).map((table: SchemaTable, index: number) => ({
    id: table.table_name,
    type: 'tableNode',
    data: { 
      tableName: table.table_name,
      columns: table.columns
    },
    position: { 
      x: 250 * Math.cos(2 * Math.PI * index / (tables?.length || 1)), 
      y: 250 * Math.sin(2 * Math.PI * index / (tables?.length || 1)) 
    },
  }));

  const edges: Edge[] = (tables || []).flatMap((table: SchemaTable) => 
    (table.foreign_keys || []).map((fk, index) => ({
      id: `${table.table_name}-${fk.referenced_table}-${index}`,
      source: table.table_name,
      target: fk.referenced_table,
      type: 'smoothstep',
      animated: true,
      label: `${fk.column_name} → ${fk.referenced_column}`,
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
    }))
  );

  return (
    <Card className="h-[800px] w-full">
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
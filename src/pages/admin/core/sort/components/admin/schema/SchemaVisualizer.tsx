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

const SchemaVisualizer = () => {
  const { data: tables } = useQuery({
    queryKey: ["database-tables"],
    queryFn: async () => {
      const { data, error } = await supabase
        .rpc('get_available_tables');
      
      if (error) throw error;
      return data;
    },
  });

  const nodes: Node[] = (tables || []).map((table: { table_name: string }, index: number) => ({
    id: table.table_name,
    type: 'default',
    data: { label: table.table_name },
    position: { 
      x: 250 * Math.cos(2 * Math.PI * index / (tables?.length || 1)), 
      y: 250 * Math.sin(2 * Math.PI * index / (tables?.length || 1)) 
    },
  }));

  return (
    <Card className="h-[600px] w-full">
      <ReactFlow
        nodes={nodes}
        edges={[]}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </Card>
  );
};

export default SchemaVisualizer;
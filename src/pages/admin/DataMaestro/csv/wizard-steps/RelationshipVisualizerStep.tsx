import { useState, useCallback } from "react";
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  Connection,
  addEdge,
  Handle,
  Position,
} from "reactflow";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { fetchAvailableTables, TableInfo } from "../utils/tableUtils";
import { useQuery } from "@tanstack/react-query";
import "reactflow/dist/style.css";

interface RelationshipVisualizerStepProps {
  config: any;
  onUpdate: (config: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const TableNode = ({ data }: { data: { label: string; fields: string[] } }) => (
  <Card className="px-4 py-2 min-w-[200px]">
    <div className="font-bold border-b pb-2 text-center">{data.label}</div>
    <div className="py-2">
      {data.fields.map((field, index) => (
        <div key={index} className="text-sm py-1">{field}</div>
      ))}
    </div>
    <Handle type="source" position={Position.Right} />
    <Handle type="target" position={Position.Left} />
  </Card>
);

const nodeTypes = {
  tableNode: TableNode,
};

export const RelationshipVisualizerStep = ({
  config,
  onUpdate,
  onNext,
  onBack,
}: RelationshipVisualizerStepProps) => {
  const [selectedTable, setSelectedTable] = useState("");
  const [relationshipType, setRelationshipType] = useState("one-to-many");
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const { data: availableTables = [] } = useQuery({
    queryKey: ['available-tables'],
    queryFn: fetchAvailableTables
  });

  const addRelationship = () => {
    if (!selectedTable) {
      setError("Please select a table");
      return;
    }

    const newNode: Node = {
      id: selectedTable,
      type: 'tableNode',
      data: { 
        label: selectedTable,
        fields: [] // You could fetch and display actual fields here
      },
      position: { 
        x: Math.random() * 500, 
        y: Math.random() * 300 
      }
    };

    const newEdge: Edge = {
      id: `e${config.table_name}-${selectedTable}`,
      source: config.table_name,
      target: selectedTable,
      label: relationshipType,
      animated: true,
    };

    setNodes(prev => [...prev, newNode]);
    setEdges(prev => [...prev, newEdge]);

    onUpdate({
      ...config,
      relationships: [
        ...(config.relationships || []),
        {
          targetTable: selectedTable,
          type: relationshipType
        }
      ]
    });

    setSelectedTable("");
    setError("");
  };

  const onConnect = useCallback(
    (params: Connection) => setEdges(eds => addEdge(params, eds)),
    []
  );

  const validateAndContinue = () => {
    if (!config.relationships?.length) {
      setError("Please define at least one relationship");
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div>
          <Label>Related Table</Label>
          <Select value={selectedTable} onValueChange={setSelectedTable}>
            <SelectTrigger>
              <SelectValue placeholder="Select a table" />
            </SelectTrigger>
            <SelectContent>
              {availableTables.map((table) => (
                <SelectItem key={table.id} value={table.id}>
                  {table.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Relationship Type</Label>
          <Select value={relationshipType} onValueChange={setRelationshipType}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="one-to-one">One-to-One</SelectItem>
              <SelectItem value="one-to-many">One-to-Many</SelectItem>
              <SelectItem value="many-to-many">Many-to-Many</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={addRelationship}>Add Relationship</Button>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>

      <div className="h-[400px] border rounded-lg">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={validateAndContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
};
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';

interface RelationshipMappingStepProps {
  config: any;
  onUpdate: (config: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export const RelationshipMappingStep = ({
  config,
  onUpdate,
  onNext,
  onBack
}: RelationshipMappingStepProps) => {
  const [selectedTable, setSelectedTable] = useState("");
  const [relationshipType, setRelationshipType] = useState("one-to-many");

  // Mock data for demonstration - replace with actual table data
  const existingTables = [
    { id: "users", label: "Users" },
    { id: "products", label: "Products" },
    { id: "orders", label: "Orders" }
  ];

  const nodes = [
    {
      id: '1',
      data: { label: config.tableName },
      position: { x: 250, y: 100 }
    },
    ...config.relationships.map((rel: any, index: number) => ({
      id: `${index + 2}`,
      data: { label: rel.targetTable },
      position: { x: 250, y: 200 + (index * 100) }
    }))
  ];

  const edges = config.relationships.map((rel: any, index: number) => ({
    id: `e${index}`,
    source: '1',
    target: `${index + 2}`,
    label: rel.relationshipType
  }));

  const addRelationship = () => {
    if (selectedTable && relationshipType) {
      onUpdate({
        ...config,
        relationships: [
          ...config.relationships,
          {
            targetTable: selectedTable,
            relationshipType,
            fieldMappings: {}
          }
        ]
      });
      setSelectedTable("");
      setRelationshipType("one-to-many");
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-4">
        <h3 className="text-lg font-medium mb-4">Add Relationship</h3>
        <div className="space-y-4">
          <div>
            <Label>Related Table</Label>
            <Select value={selectedTable} onValueChange={setSelectedTable}>
              <SelectTrigger>
                <SelectValue placeholder="Select table" />
              </SelectTrigger>
              <SelectContent>
                {existingTables.map((table) => (
                  <SelectItem key={table.id} value={table.id}>
                    {table.label}
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

          <Button onClick={addRelationship} className="w-full">
            Add Relationship
          </Button>
        </div>
      </Card>

      <div className="h-[400px] border rounded-lg">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>

      {config.relationships.length > 0 && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Relationships Added</AlertTitle>
          <AlertDescription>
            {config.relationships.length} relationship(s) configured
          </AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext}>
          Continue to CSV Parsing
        </Button>
      </div>
    </div>
  );
};
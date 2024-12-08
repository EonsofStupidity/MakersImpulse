import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TransformationRuleEditor } from "./TransformationRuleEditor";
import { DataProcessingPipeline } from "./components/DataProcessingPipeline";
import { DataPreview } from "./components/DataPreview";
import { useToast } from "@/components/ui/use-toast";
import { TransformationRule } from "@/lib/transformations/types";

const TransformationDashboard = () => {
  const [originalData, setOriginalData] = useState<any[]>([]);
  const [transformedData, setTransformedData] = useState<any[]>([]);
  const { toast } = useToast();

  const handleSaveRule = async (rule: TransformationRule) => {
    try {
      toast({
        title: "Success",
        description: "Transformation rule saved successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save transformation rule",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Data Transformation</h2>
      
      <Tabs defaultValue="rules">
        <TabsList>
          <TabsTrigger value="rules">Transformation Rules</TabsTrigger>
          <TabsTrigger value="pipeline">Processing Pipeline</TabsTrigger>
          <TabsTrigger value="preview">Data Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="rules" className="mt-6">
          <TransformationRuleEditor onSave={handleSaveRule} />
        </TabsContent>

        <TabsContent value="pipeline" className="mt-6">
          <DataProcessingPipeline />
        </TabsContent>

        <TabsContent value="preview" className="mt-6">
          <DataPreview 
            originalData={originalData}
            transformedData={transformedData}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TransformationDashboard;
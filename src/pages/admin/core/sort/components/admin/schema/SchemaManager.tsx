import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import SchemaVersions from "./SchemaVersions";
import SchemaVisualizer from "./SchemaVisualizer";
import ERDVisualizer from "./ERDVisualizer";
import TemplateBrowser from "./TemplateBrowser";

export const SchemaManager = () => {
  const [activeTab, setActiveTab] = useState("versions");

  const { data: schemaVersions } = useQuery({
    queryKey: ["schema-versions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("schema_version_control")
        .select("*")
        .order("version_number", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Schema Management</h2>
      </div>

      <Card className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="versions">Version Control</TabsTrigger>
            <TabsTrigger value="visualizer">Schema Visualizer</TabsTrigger>
            <TabsTrigger value="erd">ERD View</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="versions">
            <SchemaVersions versions={schemaVersions || []} />
          </TabsContent>

          <TabsContent value="visualizer">
            <SchemaVisualizer />
          </TabsContent>

          <TabsContent value="erd">
            <ERDVisualizer />
          </TabsContent>

          <TabsContent value="templates">
            <TemplateBrowser />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};
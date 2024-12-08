import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ComponentWizard from "../components/ComponentWizard";
import ImportWizard from "../components/vdb/ImportWizard";

export const AdminItemWizard = () => {
  const [activeTab, setActiveTab] = useState("single");

  return (
    <Card className="p-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="single">Single Entry</TabsTrigger>
          <TabsTrigger value="bulk">Bulk Import</TabsTrigger>
        </TabsList>
        <TabsContent value="single">
          <ComponentWizard />
        </TabsContent>
        <TabsContent value="bulk">
          <ImportWizard />
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default AdminItemWizard;
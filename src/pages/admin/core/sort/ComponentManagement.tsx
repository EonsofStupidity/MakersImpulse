import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Upload, Wrench, Database, FolderTree } from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";
import ComponentWizard from "./ComponentWizard";
import { ImportConfigurationWizard } from "./csv/ImportConfigurationWizard";

const ComponentManagement = () => {
  const [activeTab, setActiveTab] = useState<"add" | "import">("add");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Component Management</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-blue-500/20 bg-blue-500/5">
          <div className="flex flex-col items-center text-center space-y-4" onClick={() => setActiveTab("add")}>
            <div className="p-3 rounded-full bg-pink-500/10">
              <Wrench className="w-8 h-8 text-pink-500" />
            </div>
            <h3 className="text-xl font-semibold">3D Printer Part</h3>
            <p className="text-sm text-muted-foreground">
              Add individual components like extruders, bearings, or other printer parts
            </p>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-blue-500/20 bg-blue-500/5">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="p-3 rounded-full bg-pink-500/10">
              <FolderTree className="w-8 h-8 text-pink-500" />
            </div>
            <h3 className="text-xl font-semibold">Part Category</h3>
            <p className="text-sm text-muted-foreground">
              Create or manage categories to organize printer parts
            </p>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-blue-500/20 bg-blue-500/5">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="p-3 rounded-full bg-pink-500/10">
              <Database className="w-8 h-8 text-pink-500" />
            </div>
            <h3 className="text-xl font-semibold">Printer Build</h3>
            <p className="text-sm text-muted-foreground">
              Create a complete 3D printer build configuration
            </p>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <TooltipProvider>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "add" | "import")}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="add" className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Component
              </TabsTrigger>
              <TabsTrigger value="import" className="flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Import Components
              </TabsTrigger>
            </TabsList>

            <TabsContent value="add">
              <ComponentWizard />
            </TabsContent>

            <TabsContent value="import">
              <ImportConfigurationWizard />
            </TabsContent>
          </Tabs>
        </TooltipProvider>
      </Card>
    </div>
  );
};

export default ComponentManagement;
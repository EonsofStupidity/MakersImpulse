import { useState } from "react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Database, FolderTree, Wrench } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SingleComponentForm } from "./form/SingleComponentForm";
import { PrinterBuildForm } from "./form/PrinterBuildForm";
import { CategoryManagementWizard } from "./CategoryManagementWizard";
import ImportWizard from "../components/vdb/ImportWizard";

const entryTypes = [
  {
    id: "part",
    title: "3D Printer Part",
    description: "Add individual components like extruders, bearings, or other printer parts",
    icon: Wrench,
    bgColor: "bg-pink-500/10",
    iconColor: "text-pink-500",
    borderColor: "border-pink-500/20"
  },
  {
    id: "category",
    title: "Part Category",
    description: "Create or manage categories to organize printer parts",
    icon: FolderTree,
    bgColor: "bg-blue-500/10",
    iconColor: "text-blue-500",
    borderColor: "border-blue-500/20"
  },
  {
    id: "build",
    title: "Printer Build",
    description: "Create a complete 3D printer build configuration",
    icon: Database,
    bgColor: "bg-green-500/10",
    iconColor: "text-green-500",
    borderColor: "border-green-500/20"
  },
];

export const EntryTypeSelector = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCardClick = (typeId: string) => {
    setSelectedType(typeId);
    setIsDialogOpen(true);
  };

  const renderContent = () => {
    switch (selectedType) {
      case "part":
        return (
          <Tabs defaultValue="single" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="single">Single Entry</TabsTrigger>
              <TabsTrigger value="bulk">Bulk Import</TabsTrigger>
            </TabsList>
            <TabsContent value="single">
              <SingleComponentForm type="base_product" />
            </TabsContent>
            <TabsContent value="bulk">
              <ImportWizard />
            </TabsContent>
          </Tabs>
        );
      case "category":
        return <CategoryManagementWizard />;
      case "build":
        return <PrinterBuildForm />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {entryTypes.map((type) => {
          const Icon = type.icon;
          return (
            <motion.div
              key={type.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className={`p-6 cursor-pointer hover:shadow-lg transition-shadow ${type.borderColor} ${type.bgColor}`}
                onClick={() => handleCardClick(type.id)}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className={`p-3 rounded-full ${type.bgColor}`}>
                    <Icon className={`w-8 h-8 ${type.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-semibold">{type.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {type.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              {entryTypes.find(t => t.id === selectedType)?.title || ""}
            </DialogTitle>
          </DialogHeader>
          {renderContent()}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EntryTypeSelector;

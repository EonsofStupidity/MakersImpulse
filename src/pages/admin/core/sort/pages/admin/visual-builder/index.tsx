import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Button } from "@/components/ui/button";
import { Plus, Database, Table, FileSpreadsheet } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const VisualBuilder = () => {
  const [elements, setElements] = useState([]);
  const { toast } = useToast();

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    // Handle drag and drop logic here
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
            Visual Builder
          </h1>
          <p className="text-muted-foreground mt-2">
            Create and manage your data structures visually
          </p>
        </div>
        <Button onClick={() => toast({ title: "Creating new template..." })}>
          <Plus className="w-4 h-4 mr-2" />
          New Template
        </Button>
      </motion.div>

      <div className="grid grid-cols-12 gap-6">
        <Card className="col-span-3 p-4 space-y-4">
          <h3 className="font-medium">Components</h3>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <Database className="w-4 h-4 mr-2" />
              Table
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Table className="w-4 h-4 mr-2" />
              Field
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              Relationship
            </Button>
          </div>
        </Card>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Card className="col-span-9 p-4 min-h-[600px] bg-slate-50">
            <Droppable droppableId="canvas">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="w-full h-full"
                >
                  {elements.length === 0 && (
                    <div className="h-full flex items-center justify-center text-muted-foreground">
                      Drag and drop components here to start building
                    </div>
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Card>
        </DragDropContext>
      </div>
    </div>
  );
};

export default VisualBuilder;
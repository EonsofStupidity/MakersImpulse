import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet, Upload, Download, Table, ArrowRight } from "lucide-react";
import { ImportWizard } from "@/components/admin/components/csv/ImportWizard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

const CSVOperations = () => {
  const { toast } = useToast();
  const [showImportWizard, setShowImportWizard] = useState(false);

  const { data: importSessions } = useQuery({
    queryKey: ["import-sessions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("import_sessions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        toast({
          title: "Error fetching import sessions",
          description: error.message,
          variant: "destructive"
        });
        throw error;
      }
      return data;
    }
  });

  if (showImportWizard) {
    return <ImportWizard />;
  }

  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
          CSV Operations
        </h1>
        <p className="text-muted-foreground">
          Import, export, and manage CSV data with ease
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6 h-full hover:shadow-lg transition-shadow">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
                <Upload className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Import Data</h3>
              <p className="text-muted-foreground">
                Import CSV files with intelligent field mapping
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  {importSessions?.length || 0} Recent Imports
                </span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="group"
                  onClick={() => setShowImportWizard(true)}
                >
                  Start Import
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6 h-full hover:shadow-lg transition-shadow">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                <Download className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Export Data</h3>
              <p className="text-muted-foreground">
                Export your data to CSV format
              </p>
              <Button variant="ghost" size="sm" className="group">
                Start Export
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6 h-full hover:shadow-lg transition-shadow">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Table className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Templates</h3>
              <p className="text-muted-foreground">
                Manage import/export templates
              </p>
              <Button variant="ghost" size="sm" className="group">
                View Templates
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8"
      >
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Recent Imports</h3>
          {/* Add recent imports list here */}
        </Card>
      </motion.div>
    </div>
  );
};

export default CSVOperations;
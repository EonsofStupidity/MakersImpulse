import React from 'react';
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ImportWizard } from "@/components/admin/components/csv/ImportWizard";

export const UnifiedDataImport = () => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Import Data</h3>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <ImportWizard />
      </motion.div>
    </Card>
  );
};

export default UnifiedDataImport;
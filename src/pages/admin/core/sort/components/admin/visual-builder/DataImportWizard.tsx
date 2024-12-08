import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { FileUploadZone } from "@/components/admin/data-maestro/import/components/FileUploadZone";
import { ImportHeader } from "@/components/admin/data-maestro/import/components/ImportHeader";
import { ImportProgress } from "@/components/admin/data-maestro/import/components/ImportProgress";
import { useImportSession } from "@/components/admin/data-maestro/import/hooks/useImportSession";
import { ImportConfig } from "@/components/admin/data-maestro/types";

const initialConfig: ImportConfig = {
  tableName: "",
  relationships: [],
  tags: [],
  validationRules: {},
  primaryFields: [],
  secondaryFields: [],
  nullThreshold: 0.3,
  format: 'csv',
  formatSettings: {}
};

export const ImportWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [config, setConfig] = useState<ImportConfig>(initialConfig);
  const { session, updateSession } = useImportSession();
  const { toast } = useToast();

  const handleSaveProgress = async () => {
    try {
      await updateSession({
        ...session,
        status: 'pending',
        column_mappings: config.validationRules
      });
      
      toast({
        title: "Progress Saved",
        description: "Your import progress has been saved successfully."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save progress",
        variant: "destructive"
      });
    }
  };

  const handleCancel = () => {
    setCurrentStep(0);
    setConfig(initialConfig);
  };

  const handleConfirm = async () => {
    try {
      await updateSession({
        ...session,
        status: 'processing',
        column_mappings: config.validationRules
      });
      
      toast({
        title: "Success",
        description: "Import started successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start import",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <ImportHeader
          onSaveProgress={handleSaveProgress}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        />
        
        <ImportProgress
          status={session?.status || 'pending'}
          progress={0}
        />

        <FileUploadZone
          onFileSelect={() => {}}
          isProcessing={session?.status === 'processing'}
        />
      </div>
    </Card>
  );
};

export default ImportWizard;

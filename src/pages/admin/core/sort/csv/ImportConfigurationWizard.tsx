import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { WizardNavigation } from "./wizard/WizardNavigation";
import { WizardHeader } from "./wizard/WizardHeader";
import { WizardContent } from "./wizard/WizardContent";
import { ImportConfig, ImportSession } from "./types";
import { useImportProgress } from "@/hooks/useImportProgress";

const initialConfig: ImportConfig = {
  tableName: "",
  relationships: [],
  tags: [],
  validationRules: {},
  primaryFields: [],
  secondaryFields: [],
  nullThreshold: 0.3
};

export const ImportConfigurationWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [helpContent, setHelpContent] = useState<any>(null);
  const [config, setConfig] = useState<ImportConfig>(initialConfig);
  const [importId, setImportId] = useState<string | null>(null);
  const { toast } = useToast();
  const { progress, status } = useImportProgress(importId);

  useEffect(() => {
    const fetchHelpContent = async () => {
      const { data, error } = await supabase
        .from('wizard_help_content')
        .select('*')
        .order('order_index');
      
      if (!error && data) {
        setHelpContent(data);
      }
    };
    fetchHelpContent();
  }, []);

  const handleSubmit = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const importSession: ImportSession = {
        id: crypto.randomUUID(),
        status: 'pending',
        file_name: config.tableName,
        target_table: config.tableName,
        column_mappings: {},
        validation_errors: [],
        processed_count: 0,
        error_count: 0,
        row_count: null,
        original_data: null,
        processed_data: null
      };

      const { data: sessionData, error: sessionError } = await supabase
        .from('import_sessions')
        .insert(importSession)
        .select()
        .single();

      if (sessionError) throw sessionError;
      setImportId(sessionData.id);

      const { error } = await supabase
        .from('import_configurations')
        .insert({
          name: config.tableName,
          table_name: config.tableName,
          primary_fields: config.primaryFields,
          secondary_fields: config.secondaryFields,
          validation_rules: config.validationRules,
          null_threshold: config.nullThreshold,
          created_by: user?.id
        });

      if (error) throw error;

      toast({
        title: "Configuration Saved",
        description: "Your import configuration has been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save configuration. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleRollback = async () => {
    if (!importId) return;

    try {
      const { error } = await supabase.functions.invoke('rollback-import', {
        body: { session_id: importId }
      });

      if (error) throw error;

      toast({
        title: "Rollback Successful",
        description: "The import has been rolled back successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to rollback the import. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <WizardHeader currentStep={currentStep} />
      
      <WizardContent
        currentStep={currentStep}
        config={config}
        setConfig={setConfig}
        helpContent={helpContent}
        status={status}
        progress={progress}
        onRollback={handleRollback}
      />

      <WizardNavigation
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        config={config}
        onSubmit={handleSubmit}
        disabled={status === 'processing'}
      />
    </div>
  );
};
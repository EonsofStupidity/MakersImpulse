import { useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { FileUploadZone } from "@/components/admin/data-maestro/import/components/FileUploadZone";
import { DataPreviewTable } from "@/components/admin/data-maestro/import/components/preview/DataPreviewTable";
import { FieldMappingStep } from "@/components/admin/data-maestro/import/components/field-mapping/FieldMappingStep";
import { ValidationRulesStep } from "@/components/admin/data-maestro/import/components/validation/ValidationRulesStep";
import { PreviewStep } from "@/components/admin/data-maestro/import/components/preview/PreviewStep";
import { ReviewStep } from "@/components/admin/data-maestro/import/components/ReviewStep";
import { processCSVFile } from "./utils/csvProcessor";
import { TagsSection } from "./parsing/TagsSection";

const STEPS = [
  { id: 1, name: "Upload CSV" },
  { id: 2, name: "Preview & Map Fields" },
  { id: 3, name: "Validation Rules" },
  { id: 4, name: "Tags & Categories" },
  { id: 5, name: "Review & Import" }
];

export const ImportWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [csvData, setCSVData] = useState<any[]>([]);
  const [fieldMappings, setFieldMappings] = useState<Record<string, string>>({});
  const [validationRules, setValidationRules] = useState<Record<string, any>>({});
  const [tags, setTags] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<number, string[]>>({});
  const { toast } = useToast();

  const handleFileUpload = async (file: File) => {
    try {
      const result = await processCSVFile(file);
      setCSVData(result.data);
      setCurrentStep(2);
      
      toast({
        title: "File Uploaded Successfully",
        description: `Found ${result.fields.length} columns and ${result.data.length} rows`,
      });
    } catch (error) {
      toast({
        title: "Error Processing File",
        description: "Failed to process CSV file. Please check the format.",
        variant: "destructive",
      });
    }
  };

  const handleImport = async () => {
    try {
      const { data, error } = await supabase
        .from('import_sessions')
        .insert({
          file_name: 'import.csv',
          original_data: csvData,
          processed_data: null,
          column_mappings: fieldMappings,
          validation_errors: [],
          target_table: 'temp_imports',
          row_count: csvData.length,
          processed_count: 0,
          error_count: Object.keys(errors).length
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Import Started",
        description: "Your data is being processed. You'll be notified when it's complete.",
      });
    } catch (error) {
      toast({
        title: "Import Failed",
        description: "Failed to start import process. Please try again.",
        variant: "destructive",
      });
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <FileUploadZone onFileSelect={handleFileUpload} />
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <DataPreviewTable
              data={csvData}
              errors={errors}
              onDataChange={(rowIndex, field, value) => {
                const newData = [...csvData];
                newData[rowIndex] = { ...newData[rowIndex], [field]: value };
                setCSVData(newData);
              }}
            />
            <FieldMappingStep
              config={{ fieldMappings }}
              onUpdate={(config) => setFieldMappings(config.fieldMappings)}
              onNext={() => setCurrentStep(3)}
              onBack={() => setCurrentStep(1)}
            />
          </div>
        );
      case 3:
        return (
          <ValidationRulesStep
            config={{ validationRules }}
            onUpdate={(config) => setValidationRules(config.validationRules)}
            onNext={() => setCurrentStep(4)}
            onBack={() => setCurrentStep(2)}
          />
        );
      case 4:
        return (
          <div className="space-y-6">
            <TagsSection
              tags={tags}
              onUpdateTags={setTags}
            />
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setCurrentStep(3)}>Back</Button>
              <Button onClick={() => setCurrentStep(5)}>Next</Button>
            </div>
          </div>
        );
      case 5:
        return (
          <ReviewStep
            config={{
              data: csvData,
              fieldMappings,
              validationRules,
              tags
            }}
            onBack={() => setCurrentStep(4)}
            onSave={handleImport}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Import Data</h2>
          <Progress value={(currentStep / STEPS.length) * 100} className="h-2" />
          <div className="flex justify-between text-sm text-muted-foreground">
            {STEPS.map((step) => (
              <span
                key={step.id}
                className={currentStep >= step.id ? "text-primary" : ""}
              >
                {step.name}
              </span>
            ))}
          </div>
        </div>

        {renderStep()}
      </div>
    </Card>
  );
};

export default ImportWizard;
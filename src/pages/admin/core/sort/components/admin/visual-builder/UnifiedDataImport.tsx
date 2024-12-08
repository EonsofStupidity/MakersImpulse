import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { processFile } from "../components/csv/utils/fileUtils";
import { DataImportHeader } from "./components/DataImportHeader";
import { DataImportSteps } from "./components/DataImportSteps";
import { DataImportProgress } from "./components/DataImportProgress";

const TOTAL_STEPS = 5;

export const UnifiedDataImport = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [fileData, setFileData] = useState<any>(null);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [errors, setErrors] = useState<Record<number, string[]>>({});
  const [progress, setProgress] = useState(0);
  const [relationships, setRelationships] = useState<Array<{
    source: string;
    target: string;
    type: 'one-to-one' | 'one-to-many' | 'many-to-many';
  }>>([]);
  const [scale, setScale] = useState(100);
  const [dataIntegrity, setDataIntegrity] = useState<'checking' | 'valid' | 'invalid'>('checking');
  const { toast } = useToast();

  const validateData = () => {
    const newErrors: Record<number, string[]> = {};
    let hasErrors = false;

    previewData.forEach((row, index) => {
      const rowErrors: string[] = [];
      Object.entries(row).forEach(([key, value]) => {
        if (!value) {
          rowErrors.push(key);
          hasErrors = true;
        }
      });
      if (rowErrors.length > 0) {
        newErrors[index] = rowErrors;
      }
    });

    setErrors(newErrors);
    setDataIntegrity(hasErrors ? 'invalid' : 'valid');
    return !hasErrors;
  };

  const handleFileSelect = async (file: File) => {
    try {
      const result = await processFile(file);
      setFileData(result);
      setPreviewData(result.data);
      setProgress(25);
      setCurrentStep(2);
      toast({
        title: "File Processed Successfully",
        description: `Detected ${result.fields.length} columns and ${result.data.length} rows`,
      });
      setTimeout(validateData, 500);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process file",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = () => {
    if (validateData()) {
      setCurrentStep(3);
      setProgress(75);
    } else {
      toast({
        title: "Validation Failed",
        description: "Please fix the highlighted errors before proceeding",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="p-6">
      <div className="flex flex-col min-h-0 max-h-full space-y-6">
        <DataImportHeader currentStep={currentStep} progress={progress} />
        <DataImportProgress currentStep={currentStep} totalSteps={TOTAL_STEPS} />
        
        <DataImportSteps
          currentStep={currentStep}
          fileData={fileData}
          previewData={previewData}
          errors={errors}
          scale={scale}
          setScale={setScale}
          dataIntegrity={dataIntegrity}
          validateData={validateData}
          setPreviewData={setPreviewData}
          handleFileSelect={handleFileSelect}
          handleSubmit={handleSubmit}
          relationships={relationships}
          setRelationships={setRelationships}
        />
      </div>
    </Card>
  );
};

export default UnifiedDataImport;
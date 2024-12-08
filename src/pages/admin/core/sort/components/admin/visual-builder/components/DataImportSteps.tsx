import { FileUploadZone } from "@/components/admin/data-maestro/import/components/FileUploadZone";
import { DataPreviewSection } from "./DataPreviewSection";
import { RelationshipVisualizer } from "../../components/csv/relationship-mapping/RelationshipVisualizer";
import { Button } from "@/components/ui/button";

interface DataImportStepsProps {
  currentStep: number;
  fileData: any;
  previewData: any[];
  errors: Record<number, string[]>;
  scale: number;
  setScale: (scale: number) => void;
  dataIntegrity: 'checking' | 'valid' | 'invalid';
  validateData: () => void;
  setPreviewData: (data: any[]) => void;
  handleFileSelect: (file: File) => Promise<void>;
  handleSubmit: () => void;
  relationships: Array<{
    source: string;
    target: string;
    type: 'one-to-one' | 'one-to-many' | 'many-to-many';
  }>;
  setRelationships: (relationships: Array<{
    source: string;
    target: string;
    type: 'one-to-one' | 'one-to-many' | 'many-to-many';
  }>) => void;
}

export const DataImportSteps = ({
  currentStep,
  fileData,
  previewData,
  errors,
  scale,
  setScale,
  dataIntegrity,
  validateData,
  setPreviewData,
  handleFileSelect,
  handleSubmit,
  relationships,
  setRelationships
}: DataImportStepsProps) => {
  const tables = [{
    name: fileData?.tableName || 'ImportedData',
    fields: fileData?.fields || [],
    isPrimary: true
  }];

  return (
    <div className="flex-1 overflow-hidden flex flex-col space-y-4">
      {currentStep === 1 && (
        <FileUploadZone onFileSelect={handleFileSelect} />
      )}

      {currentStep === 2 && previewData.length > 0 && (
        <div className="flex flex-col space-y-4">
          <DataPreviewSection 
            previewData={previewData}
            errors={errors}
            scale={scale}
            setScale={setScale}
            dataIntegrity={dataIntegrity}
            validateData={validateData}
            setPreviewData={setPreviewData}
          />

          <div className="sticky bottom-0 pt-4 bg-background">
            <Button 
              onClick={handleSubmit}
              disabled={dataIntegrity === 'invalid'}
              className="w-full"
            >
              Continue to Relationships
            </Button>
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <RelationshipVisualizer
          tables={tables}
          relationships={relationships}
          onRelationshipChange={setRelationships}
          tableName={fileData?.tableName}
        />
      )}

      {currentStep === 4 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Review Your Import</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Data Preview</h4>
              <p>{previewData.length} rows ready for import</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
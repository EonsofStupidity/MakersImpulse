import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { AlertTriangle, Check } from "lucide-react";
import { DataPreviewTable } from "@/components/admin/data-maestro/import/components/csv/parsing/DataPreviewTable";
import { ValidationSummary } from "@/components/admin/data-maestro/import/components/validation/ValidationSummary";

interface DataPreviewSectionProps {
  previewData: any[];
  errors: Record<number, string[]>;
  scale: number;
  setScale: (scale: number) => void;
  dataIntegrity: 'checking' | 'valid' | 'invalid';
  validateData: () => void;
  setPreviewData: (data: any[]) => void;
}

export const DataPreviewSection = ({
  previewData,
  errors,
  scale,
  setScale,
  dataIntegrity,
  validateData,
  setPreviewData
}: DataPreviewSectionProps) => {
  return (
    <div className="flex flex-col space-y-4" style={{ height: 'calc(100vh - 300px)' }}>
      <ValidationSummary 
        errors={errors} 
        progress={dataIntegrity === 'checking' ? 50 : 100} 
        totalRows={previewData.length}
      />
      
      <div className="sticky top-0 z-50 bg-background border-b p-4 rounded-t-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {dataIntegrity === 'checking' && <AlertTriangle className="text-yellow-500" />}
            {dataIntegrity === 'valid' && <Check className="text-green-500" />}
            {dataIntegrity === 'invalid' && <AlertTriangle className="text-red-500" />}
            <span className="text-sm">
              {dataIntegrity === 'checking' && "Checking data integrity..."}
              {dataIntegrity === 'valid' && "Data integrity verified"}
              {dataIntegrity === 'invalid' && "Data integrity issues found"}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm">Zoom: {scale}%</span>
            <Slider
              value={[scale]}
              onValueChange={(value) => setScale(value[0])}
              min={50}
              max={150}
              step={10}
              className="w-32"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden border rounded-lg bg-background">
        <DataPreviewTable
          data={previewData}
          errors={errors}
          onDataChange={(rowIndex, field, value) => {
            const newData = [...previewData];
            newData[rowIndex] = { ...newData[rowIndex], [field]: value };
            setPreviewData(newData);
            validateData();
          }}
        />
      </div>
    </div>
  );
};
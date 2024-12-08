import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { AlertCircle, Wand2 } from "lucide-react";

interface BatchErrorCorrectionProps {
  errors?: Record<number, string[]>;
  onBatchCorrect?: (field: string, value: string, rowIndexes: number[]) => void;
}

const BatchErrorCorrection = ({ 
  errors = {}, 
  onBatchCorrect = () => {} 
}: BatchErrorCorrectionProps) => {
  const [selectedField, setSelectedField] = useState<string>("");
  const [correctionValue, setCorrectionValue] = useState("");

  // Get unique fields that have errors
  const errorFields = Array.from(
    new Set(
      Object.values(errors).flatMap(fieldErrors => fieldErrors)
    )
  );

  const affectedRows = Object.entries(errors)
    .filter(([_, fieldErrors]) => fieldErrors.includes(selectedField))
    .map(([rowIndex]) => parseInt(rowIndex));

  const handleCorrection = () => {
    if (selectedField && correctionValue) {
      onBatchCorrect(selectedField, correctionValue, affectedRows);
      setCorrectionValue("");
    }
  };

  if (!errorFields.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="space-y-4 p-4 border rounded-lg bg-muted/50"
    >
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <AlertCircle className="h-4 w-4" />
        <span>Batch Error Correction</span>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Select Field</Label>
          <select
            className="w-full h-10 px-3 rounded-md border"
            value={selectedField}
            onChange={(e) => setSelectedField(e.target.value)}
          >
            <option value="">Select a field...</option>
            {errorFields.map(field => (
              <option key={field} value={field}>{field}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label>Correction Value</Label>
          <Input
            value={correctionValue}
            onChange={(e) => setCorrectionValue(e.target.value)}
            placeholder="Enter value to apply..."
          />
        </div>

        <div className="flex items-end">
          <Button
            onClick={handleCorrection}
            disabled={!selectedField || !correctionValue}
            className="w-full"
          >
            <Wand2 className="h-4 w-4 mr-2" />
            Apply to {affectedRows.length} rows
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default BatchErrorCorrection;
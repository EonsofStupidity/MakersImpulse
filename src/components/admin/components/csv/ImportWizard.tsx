import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileType, CheckCircle2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const ImportWizard = () => {
  const [file, setFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile);
    } else {
      toast.error("Please select a valid CSV file");
    }
  };

  const handleImport = async () => {
    if (!file) return;

    setImporting(true);
    try {
      // Import logic will be implemented here
      toast.success("Import started successfully");
    } catch (error) {
      console.error("Import error:", error);
      toast.error("Failed to start import");
    } finally {
      setImporting(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Import Data</h3>
          {file && (
            <div className="flex items-center text-sm text-green-500">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              File selected
            </div>
          )}
        </div>

        <div className="border-2 border-dashed rounded-lg p-8 text-center">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileSelect}
            className="hidden"
            id="csv-upload"
          />
          <label
            htmlFor="csv-upload"
            className="cursor-pointer flex flex-col items-center"
          >
            <Upload className="w-8 h-8 mb-2 text-gray-400" />
            <span className="text-sm text-gray-500">
              Click to select a CSV file
            </span>
          </label>
        </div>

        {file && (
          <div className="flex justify-end">
            <Button
              onClick={handleImport}
              disabled={importing}
              className="w-full sm:w-auto"
            >
              {importing ? "Importing..." : "Start Import"}
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ImportWizard;
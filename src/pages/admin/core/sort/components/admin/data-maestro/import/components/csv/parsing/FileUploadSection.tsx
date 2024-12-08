import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload } from "lucide-react";
import { DelimiterType, FileEncoding } from "../../../types/parsing";

interface FileUploadSectionProps {
  onFileSelect: (file: File) => void;
  delimiter: DelimiterType;
  encoding: FileEncoding;
  isAnalyzing: boolean;
  file: File | null;
  onDelimiterChange: (delimiter: DelimiterType) => void;
  onEncodingChange: (encoding: FileEncoding) => void;
}

export const FileUploadSection = ({ 
  onFileSelect,
  delimiter,
  encoding,
  isAnalyzing,
  file,
  onDelimiterChange,
  onEncodingChange 
}: FileUploadSectionProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.csv'],
      'text/plain': ['.csv']
    },
    maxFiles: 1,
    disabled: isAnalyzing
  });

  return (
    <Card className="p-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'}
          ${isAnalyzing ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} />
        <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        {isDragActive ? (
          <p>Drop the CSV file here</p>
        ) : (
          <div className="space-y-2">
            <p>Drag & drop a CSV file here, or click to select one</p>
            <p className="text-sm text-muted-foreground">
              Supported formats: .csv
            </p>
            <Button type="button" variant="outline" disabled={isAnalyzing}>
              Select File
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};
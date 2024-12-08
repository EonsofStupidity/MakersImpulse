// Move from src/components/admin/data-maestro/import/components/FileUploadZone
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card } from '@/components/ui/card';
import { Upload, Loader2 } from 'lucide-react';

interface FileUploadZoneProps {
  onFileSelect: (file: File) => void;
  isProcessing?: boolean;
}

export const FileUploadZone = ({ onFileSelect, isProcessing }: FileUploadZoneProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/json': ['.json'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls']
    },
    multiple: false,
    disabled: isProcessing
  });

  return (
    <Card
      {...getRootProps()}
      className={`p-8 border-2 border-dashed cursor-pointer transition-colors ${
        isDragActive ? 'border-primary bg-primary/5' : 'border-muted'
      } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center text-center space-y-4">
        {isProcessing ? (
          <Loader2 className="h-12 w-12 animate-spin text-muted-foreground" />
        ) : (
          <Upload className="h-12 w-12 text-muted-foreground" />
        )}
        <div className="space-y-2">
          <p className="text-sm font-medium">
            {isDragActive ? 'Drop the file here' : 'Drag & drop a file here'}
          </p>
          <p className="text-xs text-muted-foreground">
            Supported formats: CSV, JSON, XLSX, XLS
          </p>
        </div>
      </div>
    </Card>
  );
};
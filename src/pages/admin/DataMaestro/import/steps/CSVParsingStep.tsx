import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { FileUploadSection } from "@/components/admin/data-maestro/import/components/csv/parsing/FileUploadSection";
import { DataPreviewTable } from "@/components/admin/data-maestro/import/components/csv/parsing/DataPreviewTable";
import { ValidationSummary } from "@/components/admin/data-maestro/import/components/validation/ValidationSummary";
import { ParsingDocumentation } from "@/components/admin/data-maestro/import/components/csv/parsing/ParsingDocumentation";
import { TagsSection } from "@/components/admin/data-maestro/import/components/csv/parsing/TagsSection";
import { detectDelimiter, detectEncoding } from "@/components/admin/data-maestro/import/utils/fileUtils";
import { DelimiterType, FileEncoding, CSVParsingStepProps } from "@/components/admin/data-maestro/import/types/parsing";

export const CSVParsingStep = ({
  config,
  onUpdate,
  onNext,
  onBack
}: CSVParsingStepProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [delimiter, setDelimiter] = useState<DelimiterType>('comma');
  const [encoding, setEncoding] = useState<FileEncoding>('UTF-8');
  const [errors, setErrors] = useState<Record<number, string[]>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [tags, setTags] = useState<string[]>([]);
  const { toast } = useToast();

  const validateData = useCallback((data: any[]) => {
    const newErrors: Record<number, string[]> = {};
    
    data.forEach((row, index) => {
      const rowErrors: string[] = [];
      
      config.primaryFields.forEach((field: any) => {
        if (field.isRequired && !row[field.name]) {
          rowErrors.push(`Missing required field: ${field.name}`);
        }
      });

      if (rowErrors.length > 0) {
        newErrors[index] = rowErrors;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [config]);

  const handleFileSelect = async (selectedFile: File) => {
    if (selectedFile) {
      setFile(selectedFile);
      setIsAnalyzing(true);
      
      try {
        const detectedEncoding = await detectEncoding(selectedFile) as FileEncoding;
        const text = await selectedFile.text();
        const detectedDelimiter = detectDelimiter(text) as DelimiterType;
        
        setEncoding(detectedEncoding);
        setDelimiter(detectedDelimiter);
        
        const lines = text.split('\n');
        const headers = lines[0].split(detectedDelimiter === 'tab' ? '\t' : 
          detectedDelimiter === 'comma' ? ',' : 
          detectedDelimiter === 'semicolon' ? ';' : '|'
        ).map(h => h.trim());
        
        const data = lines.slice(1, 51).map(line => {
          const values = line.split(detectedDelimiter === 'tab' ? '\t' : 
            detectedDelimiter === 'comma' ? ',' : 
            detectedDelimiter === 'semicolon' ? ';' : '|'
          ).map(v => v.trim());
          return headers.reduce((obj, header, i) => {
            obj[header] = values[i];
            return obj;
          }, {} as any);
        });

        setPreviewData(data);
        validateData(data);

        const { error } = await supabase
          .from('temp_imports')
          .insert({
            original_filename: selectedFile.name,
            raw_data: data,
            error_summary: {},
            import_type: 'csv',
            expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            detected_encoding: detectedEncoding,
            detected_delimiter: detectedDelimiter
          });

        if (error) throw error;

        toast({
          title: "File Analysis Complete",
          description: `Detected delimiter: ${detectedDelimiter}, encoding: ${detectedEncoding}`,
        });
      } catch (error) {
        toast({
          title: "Error analyzing file",
          description: "Failed to analyze the CSV file. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsAnalyzing(false);
      }
    }
  };

  const handleDataChange = (rowIndex: number, field: string, value: string) => {
    const newData = [...previewData];
    newData[rowIndex] = { ...newData[rowIndex], [field]: value };
    setPreviewData(newData);
    validateData(newData);
  };

  return (
    <div className="space-y-6">
      <ParsingDocumentation />

      <FileUploadSection
        delimiter={delimiter}
        encoding={encoding}
        isAnalyzing={isAnalyzing}
        file={file}
        onDelimiterChange={setDelimiter}
        onEncodingChange={setEncoding}
        onFileSelect={handleFileSelect}
      />

      <ValidationSummary 
        errors={errors} 
        progress={progress}
        totalRows={previewData.length} 
      />

      {previewData.length > 0 && (
        <>
          <DataPreviewTable
            data={previewData}
            errors={errors}
            onDataChange={handleDataChange}
          />

          <TagsSection
            tags={tags}
            onUpdateTags={setTags}
          />
        </>
      )}

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button 
          onClick={onNext}
          disabled={Object.keys(errors).length > 0 || previewData.length === 0}
        >
          Continue to Tag Configuration
        </Button>
      </div>
    </div>
  );
};
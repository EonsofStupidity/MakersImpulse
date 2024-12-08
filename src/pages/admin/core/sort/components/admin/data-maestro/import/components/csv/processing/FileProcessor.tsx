import { useToast } from "@/components/ui/use-toast";
import { detectDelimiter, detectEncoding } from "@/components/admin/data-maestro/import/utils/fileUtils";
import { DelimiterType, FileEncoding } from "@/components/admin/data-maestro/import/types/parsing";

interface FileProcessorProps {
  onFileProcess: (data: any[], delimiter: DelimiterType, encoding: FileEncoding) => void;
  onError: (error: string) => void;
  isProcessing: boolean;
}

export const FileProcessor = ({
  onFileProcess,
  onError,
  isProcessing
}: FileProcessorProps) => {
  const { toast } = useToast();

  const processFile = async (file: File) => {
    try {
      const detectedEncoding = await detectEncoding(file) as FileEncoding;
      const text = await file.text();
      const detectedDelimiter = detectDelimiter(text) as DelimiterType;
      
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

      onFileProcess(data, detectedDelimiter, detectedEncoding);

      toast({
        title: "File Analysis Complete",
        description: `Detected delimiter: ${detectedDelimiter}, encoding: ${detectedEncoding}`,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      onError(errorMessage);
      toast({
        title: "Error analyzing file",
        description: "Failed to analyze the CSV file. Please try again.",
        variant: "destructive",
      });
    }
  };

  return null; // This is a logic-only component
};

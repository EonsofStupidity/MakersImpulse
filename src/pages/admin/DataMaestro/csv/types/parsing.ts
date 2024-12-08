export type DelimiterType = 'comma' | 'semicolon' | 'tab' | 'pipe';
export type FileEncoding = 'UTF-8' | 'ASCII' | 'ISO-8859-1' | 'UTF-16';

export interface ParsingResult {
  data: any[];
  detectedDelimiter: DelimiterType;
  detectedEncoding: FileEncoding;
}

export interface CSVParsingStepProps {
  config: any;
  onUpdate: (config: any) => void;
  onNext: () => void;
  onBack: () => void;
}
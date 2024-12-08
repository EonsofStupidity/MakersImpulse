export type DelimiterType = 'comma' | 'semicolon' | 'tab' | 'pipe';
export type FileEncoding = 'UTF-8' | 'ASCII' | 'ISO-8859-1' | 'UTF-16';

export interface CSVParsingStepProps {
  config: any;
  onUpdate: (config: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export interface ValidationSummaryProps {
  errors: Record<number, string[]>;
  progress: number;
  totalRows?: number;
}
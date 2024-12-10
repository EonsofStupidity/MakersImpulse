export interface ImportSession {
  id: string;
  user_id: string;
  status: string;
  file_name: string;
  file_size: number;
  row_count: number;
  created_at: string;
  completed_at: string;
  error_message: string;
  type: string;
  metadata: Record<string, any>;
}

export interface ImportWizardProps {
  type: 'page' | 'theme' | 'template' | 'csv';
  onImport: (data: any) => Promise<void>;
}
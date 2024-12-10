export interface ImportConfig {
  type: 'page' | 'theme' | 'template';
  schema: Record<string, any>;
  validator: (data: any) => boolean;
}

export interface ImportedAsset {
  id: string;
  type: 'page' | 'theme' | 'template';
  name: string;
  content: any;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface ImportValidationResult {
  isValid: boolean;
  errors?: string[];
}
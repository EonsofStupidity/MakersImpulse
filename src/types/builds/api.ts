import type { Build, BuildFormData, BuildQueryParams } from './index';
import type { PostgrestError } from '@supabase/supabase-js';

export interface BuildsApiResponse {
  data: Build[] | null;
  error: PostgrestError | null;
  count?: number;
}

export interface BuildApiResponse {
  data: Build | null;
  error: PostgrestError | null;
}

export interface CreateBuildRequest {
  data: BuildFormData;
}

export interface UpdateBuildRequest {
  id: string;
  data: Partial<BuildFormData>;
}

export interface DeleteBuildRequest {
  id: string;
}
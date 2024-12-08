import type { BuildConfig } from "@/types/build";

export interface BuildSubmissionData {
  name: string;
  components: BuildConfig['components'];
  title: string;
  description: string;
  build_type: string;
  estimated_cost: number;
  difficulty_level?: string;
  build_time_hours?: number;
  images: Array<{
    url: string;
    annotations: any;
    step_number: number;
    caption?: string;
  }>;
  verification_responses: Array<{
    question_id: string;
    response: boolean;
    notes?: string;
  }>;
}

export interface WizardStepProps {
  initialData: BuildSubmissionData;
  onComplete: (data: Partial<BuildSubmissionData>) => void;
}
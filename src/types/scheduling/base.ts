export type ScheduleStatus = 'pending' | 'completed' | 'failed';

export interface ScheduledPublication {
  id: string;
  contentId: string;
  revisionId: string;
  scheduledFor: Date;
  status: ScheduleStatus;
  createdBy: string;
  createdAt: Date;
  processedAt?: Date;
  metadata?: {
    error?: string;
    processedBy?: string;
  };
}

export interface SchedulingValidation {
  isValid: boolean;
  error?: string;
}

export interface SchedulingRules {
  minTimeFromNow: number; // minutes
  maxTimeFromNow: number; // minutes
  allowedDays: number[]; // 0-6, where 0 is Sunday
  blackoutPeriods?: Array<{
    start: string; // HH:mm
    end: string; // HH:mm
  }>;
}
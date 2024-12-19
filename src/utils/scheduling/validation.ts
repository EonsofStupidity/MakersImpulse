import { SchedulingValidation, SchedulingRules } from "@/types/scheduling/base";
import { isAfter, isBefore, addMinutes, addDays } from "date-fns";

export const validateSchedulingTime = (
  scheduledTime: Date,
  rules: SchedulingRules = {
    minTimeFromNow: 5,
    maxTimeFromNow: 43200, // 30 days
    allowedDays: [0, 1, 2, 3, 4, 5, 6],
  }
): SchedulingValidation => {
  const now = new Date();
  const minTime = addMinutes(now, rules.minTimeFromNow);
  const maxTime = addMinutes(now, rules.maxTimeFromNow);

  if (isBefore(scheduledTime, minTime)) {
    return {
      isValid: false,
      error: `Schedule time must be at least ${rules.minTimeFromNow} minutes from now`,
    };
  }

  if (isAfter(scheduledTime, maxTime)) {
    return {
      isValid: false,
      error: `Schedule time cannot be more than ${rules.maxTimeFromNow / 1440} days in the future`,
    };
  }

  if (!rules.allowedDays.includes(scheduledTime.getDay())) {
    return {
      isValid: false,
      error: "Selected day is not allowed for scheduling",
    };
  }

  return { isValid: true };
};

export const validateSchedulingConflicts = async (
  contentId: string,
  scheduledTime: Date
): Promise<SchedulingValidation> => {
  const { data: existingSchedules } = await supabase
    .from("publishing_queue")
    .select("scheduled_for")
    .eq("content_id", contentId)
    .eq("status", "pending");

  if (existingSchedules?.some(schedule => 
    Math.abs(new Date(schedule.scheduled_for).getTime() - scheduledTime.getTime()) < 300000 // 5 minutes
  )) {
    return {
      isValid: false,
      error: "Another publication is already scheduled within 5 minutes of this time",
    };
  }

  return { isValid: true };
};
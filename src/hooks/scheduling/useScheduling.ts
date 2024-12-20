import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { validateSchedulingTime, validateSchedulingConflicts } from "@/utils/scheduling/validation";
import type { ScheduledPublication } from "@/types/scheduling/base";

export const useScheduling = (contentId: string | undefined) => {
  const queryClient = useQueryClient();
  const [isScheduling, setIsScheduling] = useState(false);

  const { data: scheduledPublications, isLoading } = useQuery({
    queryKey: ["scheduled-publications", contentId],
    queryFn: async () => {
      // Don't fetch if no contentId is provided
      if (!contentId) {
        return [];
      }

      const { data, error } = await supabase
        .from("publishing_queue")
        .select("*, profiles(display_name)")
        .eq("content_id", contentId)
        .order("scheduled_for", { ascending: true });

      if (error) {
        console.error("Error fetching scheduled publications:", error);
        throw error;
      }

      return data?.map(item => ({
        id: item.id,
        contentId: item.content_id,
        revisionId: item.revision_id,
        scheduledFor: new Date(item.scheduled_for),
        status: item.status,
        createdBy: item.created_by,
        createdAt: new Date(item.created_at),
        processedAt: item.processed_at ? new Date(item.processed_at) : undefined,
      })) as ScheduledPublication[];
    },
    staleTime: 1000 * 60, // 1 minute
    retry: 2,
    enabled: !!contentId, // Only run query if contentId exists
  });

  const schedulePublication = useMutation({
    mutationFn: async ({ 
      revisionId, 
      scheduledFor 
    }: { 
      revisionId: string; 
      scheduledFor: Date;
    }) => {
      if (!contentId) {
        throw new Error("No content selected");
      }

      setIsScheduling(true);
      try {
        // Validate scheduling time
        const timeValidation = validateSchedulingTime(scheduledFor);
        if (!timeValidation.isValid) {
          throw new Error(timeValidation.error);
        }

        // Check for conflicts
        const conflictValidation = await validateSchedulingConflicts(contentId, scheduledFor);
        if (!conflictValidation.isValid) {
          throw new Error(conflictValidation.error);
        }

        const { data, error } = await supabase
          .from("publishing_queue")
          .insert({
            content_id: contentId,
            revision_id: revisionId,
            scheduled_for: scheduledFor.toISOString(),
            status: "pending",
          })
          .select()
          .single();

        if (error) throw error;
        return data;
      } finally {
        setIsScheduling(false);
      }
    },
    onSuccess: () => {
      toast.success("Publication scheduled successfully");
      queryClient.invalidateQueries({ queryKey: ["scheduled-publications", contentId] });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Failed to schedule publication");
    },
  });

  const cancelScheduledPublication = useMutation({
    mutationFn: async (scheduleId: string) => {
      const { error } = await supabase
        .from("publishing_queue")
        .delete()
        .eq("id", scheduleId);

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Scheduled publication cancelled");
      queryClient.invalidateQueries({ queryKey: ["scheduled-publications", contentId] });
    },
    onError: () => {
      toast.error("Failed to cancel scheduled publication");
    },
  });

  return {
    scheduledPublications: scheduledPublications || [],
    isLoading,
    isScheduling,
    schedulePublication,
    cancelScheduledPublication,
  };
};
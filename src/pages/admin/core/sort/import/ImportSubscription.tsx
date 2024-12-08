import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ImportPayload } from "../types";

export const useImportSubscription = (importId: string | null) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!importId) return;

    const channel = supabase
      .channel(`import-${importId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'temp_imports',
          filter: `id=eq.${importId}`,
        },
        (payload: { new: ImportPayload }) => {
          if (payload.new.status === 'completed') {
            toast({
              title: "Import Completed",
              description: "Your data has been successfully imported.",
            });
            queryClient.invalidateQueries({ queryKey: ['component-imports'] });
          } else if (payload.new.status === 'failed') {
            toast({
              title: "Import Failed",
              description: "There was an error processing your import.",
              variant: "destructive",
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [importId, toast, queryClient]);
};
import { useSession } from "@supabase/auth-helpers-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const usePageMutations = (gridColumns: number, gridEnabled: boolean, snapToGrid: boolean) => {
  const session = useSession();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const updatePage = useMutation({
    mutationFn: async (updates: any) => {
      if (!session?.user?.id) throw new Error("User must be logged in");
      
      const { error } = await supabase
        .from("builder_pages")
        .update(updates)
        .eq("user_id", session.user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["builder-page"] });
      toast({
        title: "Page Updated",
        description: "The page has been updated successfully.",
      });
    },
  });

  return { updatePage };
};
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { ContentRelationship } from "../types/cms";

export const useContentRelationships = (contentId?: string) => {
  const queryClient = useQueryClient();

  const { data: relationships, isLoading } = useQuery({
    queryKey: ["content_relationships", contentId],
    queryFn: async () => {
      console.log("Fetching relationships for content:", contentId);
      if (!contentId) return [];

      const { data, error } = await supabase
        .from("cms_content_relationships")
        .select("*")
        .or(`parent_id.eq.${contentId},child_id.eq.${contentId}`);

      if (error) {
        console.error("Error fetching relationships:", error);
        toast.error("Failed to load relationships");
        throw error;
      }

      return data as ContentRelationship[];
    },
    enabled: !!contentId,
  });

  const { mutate: createRelationship } = useMutation({
    mutationFn: async (relationship: Omit<ContentRelationship, "id">) => {
      console.log("Creating relationship:", relationship);
      const { data, error } = await supabase
        .from("cms_content_relationships")
        .insert([relationship])
        .select()
        .single();

      if (error) {
        console.error("Error creating relationship:", error);
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content_relationships"] });
      toast.success("Relationship created successfully");
    },
    onError: (error) => {
      console.error("Error in relationship creation:", error);
      toast.error("Failed to create relationship");
    },
  });

  return {
    relationships,
    isLoading,
    createRelationship,
  };
};
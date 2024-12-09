import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { ContentRelationship } from "../types/cms";
import { validateContentRelationship } from "../utils/contentTypeValidation";
import type { ContentType } from "../types/contentTypes";

interface RelationshipWithContent extends Omit<ContentRelationship, 'parent_id' | 'child_id'> {
  parent_id: string;
  child_id: string;
  parent: { id: string; type: ContentType };
  child: { id: string; type: ContentType };
}

export const useContentRelationships = (contentId?: string) => {
  const queryClient = useQueryClient();

  const { data: relationships, isLoading } = useQuery({
    queryKey: ["content_relationships", contentId],
    queryFn: async () => {
      console.log("Fetching relationships for content:", contentId);
      if (!contentId) return [];

      const { data, error } = await supabase
        .from("cms_content_relationships")
        .select(`
          id,
          parent_id,
          child_id,
          relationship_type,
          order_index,
          parent:cms_content!parent_id(id, type),
          child:cms_content!child_id(id, type)
        `)
        .or(`parent_id.eq.${contentId},child_id.eq.${contentId}`);

      if (error) {
        console.error("Error fetching relationships:", error);
        toast.error("Failed to load relationships");
        throw error;
      }

      console.log("Fetched relationships:", data);
      return data as RelationshipWithContent[];
    },
    enabled: !!contentId,
  });

  const createRelationship = useMutation({
    mutationFn: async ({ 
      parentId, 
      childId,
      parentType,
      childType,
      relationshipType,
      orderIndex = 0 
    }: {
      parentId: string;
      childId: string;
      parentType: ContentType;
      childType: ContentType;
      relationshipType: string;
      orderIndex?: number;
    }) => {
      console.log("Creating relationship:", { parentId, childId, relationshipType });

      // Validate relationship between content types
      if (!validateContentRelationship(parentType, childType)) {
        throw new Error("Invalid content type relationship");
      }

      const { data, error } = await supabase
        .from("cms_content_relationships")
        .insert({
          parent_id: parentId,
          child_id: childId,
          relationship_type: relationshipType,
          order_index: orderIndex
        })
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
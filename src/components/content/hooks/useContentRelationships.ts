import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { isContentPage, isContentComponent } from "@/utils/validators";
import type { BaseContent } from "../types/cms";

interface RelationshipWithContent {
  id: string;
  parent_id: string;
  child_id: string;
  relationship_type: string;
  order_index: number;
  parent: BaseContent;
  child: BaseContent;
}

export const useContentRelationships = (contentId?: string) => {
  return useQuery({
    queryKey: ["content_relationships", contentId],
    queryFn: async () => {
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
        toast.error("Failed to load relationships");
        throw error;
      }

      return data.map((relationship) => ({
        ...relationship,
        parent: Array.isArray(relationship.parent) ? relationship.parent[0] : relationship.parent,
        child: Array.isArray(relationship.child) ? relationship.child[0] : relationship.child,
      })) as RelationshipWithContent[];
    },
    enabled: !!contentId,
  });
};
import { isContentPage, isContentComponent } from "@/utils/validators";

const handleSubmit = (content: Json) => {
  if (isContentPage(content)) {
    // Logic for page content
  } else if (isContentComponent(content)) {
    // Logic for component content
  } else {
    toast.error("Invalid content structure");
    return;
  }
};
useContentRelationships.ts

const { data: relationships, isLoading } = useQuery({
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

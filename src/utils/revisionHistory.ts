import { supabase } from "@/integrations/supabase/client";

export type RevisionType = 'create' | 'update' | 'delete';

export async function trackRevision(
  entityType: string,
  entityId: string,
  changes: Record<string, any>,
  revisionType: RevisionType
) {
  const { error } = await supabase
    .from('revision_history')
    .insert({
      entity_type: entityType,
      entity_id: entityId,
      changes,
      revision_type: revisionType,
    });

  if (error) throw error;
}
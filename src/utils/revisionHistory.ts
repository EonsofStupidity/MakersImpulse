import { supabase } from '@/integrations/supabase/client';

export const addRevisionEntry = async (
  entityType: string,
  entityId: string,
  changes: any,
  revisionType: string
) => {
  const { data, error } = await supabase
    .from('revision_history')
    .insert({
      entity_type: entityType,
      entity_id: entityId,
      changes,
      revision_type: revisionType,
      created_by: supabase.auth.getUser()?.data.user?.id
    });

  if (error) {
    console.error('Failed to add revision entry:', error);
    throw error;
  }

  return data;
};
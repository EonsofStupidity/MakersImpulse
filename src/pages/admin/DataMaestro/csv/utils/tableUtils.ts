import { supabase } from "@/integrations/supabase/client";

export interface TableInfo {
  id: string;
  name: string;
}

export const fetchAvailableTables = async (): Promise<TableInfo[]> => {
  const { data, error } = await supabase
    .rpc('get_available_tables');
    
  if (error) {
    console.error('Error fetching tables:', error);
    return [];
  }

  return (data || []).map((table: { table_name: string }) => ({
    id: table.table_name,
    name: table.table_name
  }));
};
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

type TableDefinition<RowType> = {
  Row: Readonly<RowType>;
  Insert: Partial<RowType> & Required<Pick<RowType, "id">>;
  Update: Partial<RowType>;
  Relationships: Array<{
    foreignKeyName: string;
    columns: string[];
    referencedRelation: string;
    referencedColumns: string[];
  }>;
}

export type { TableDefinition };
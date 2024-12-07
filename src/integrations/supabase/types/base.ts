export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// Make relationships a separate type that doesn't depend on RowType
type TableRelationship = {
  foreignKeyName: string;
  columns: string[];
  referencedRelation: string;
  referencedColumns: string[];
};

type TableDefinition<RowType> = {
  Row: Readonly<RowType>;
  Insert: Partial<RowType> & Required<Pick<RowType, "id">>;
  Update: Partial<RowType>;
  Relationships: TableRelationship[];
};

export type { TableDefinition, TableRelationship };
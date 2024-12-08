export interface GridPosition {
  column: number;
  row: number;
  span: number;
}

export interface MappedField {
  source: string;
  target: string;
  gridPosition: GridPosition;
}

export interface DragDropFieldMappingProps {
  sourceFields: string[];
  targetFields: string[];
  mappings: Record<string, string>;
  onUpdateMapping: (mappings: Record<string, string>) => void;
  gridSettings?: {
    columns: number;
    showGrid: boolean;
    snapToGrid: boolean;
    cellSize: number;
    gap: number;
  };
}
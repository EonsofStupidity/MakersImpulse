import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FieldMappingAutocomplete } from "./FieldMappingAutocomplete";

interface FieldMappingTableProps {
  sourceFields: string[];
  targetFields: string[];
  mappings: Record<string, string>;
  onUpdateMapping: (sourceField: string, targetField: string) => void;
}

export const FieldMappingTable = ({
  sourceFields,
  targetFields,
  mappings,
  onUpdateMapping,
}: FieldMappingTableProps) => {
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>CSV Column</TableHead>
            <TableHead>Database Field</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sourceFields.map((sourceField) => (
            <TableRow key={sourceField}>
              <TableCell className="font-medium">{sourceField}</TableCell>
              <TableCell>
                <FieldMappingAutocomplete
                  sourceFields={sourceFields}
                  targetFields={targetFields}
                  value={mappings[sourceField] || ""}
                  onSelect={(targetField) => onUpdateMapping(sourceField, targetField)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
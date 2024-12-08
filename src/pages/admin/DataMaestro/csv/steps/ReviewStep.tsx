import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ReviewStepProps {
  config: any;
  onBack: () => void;
  onSave: () => void;
}

export const ReviewStep = ({ config, onBack, onSave }: ReviewStepProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Configuration Summary</h3>
          <p className="text-sm text-muted-foreground">
            Review your import configuration before saving
          </p>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium">Basic Details</h4>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="text-sm text-muted-foreground">Name:</span>
              <p>{config.name}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Table:</span>
              <p>{config.table_name}</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium">Fields</h4>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Field Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Validation Rules</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {config.primary_fields.map((field: any) => (
                <TableRow key={field.name}>
                  <TableCell>{field.name}</TableCell>
                  <TableCell>{field.type}</TableCell>
                  <TableCell>
                    {config.validation_rules[field.name] ? (
                      <ul className="list-disc list-inside">
                        {Object.entries(config.validation_rules[field.name]).map(
                          ([rule, value]) => (
                            <li key={rule}>
                              {rule}: {String(value)}
                            </li>
                          )
                        )}
                      </ul>
                    ) : (
                      "No validation rules"
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onSave}>Save Configuration</Button>
      </div>
    </div>
  );
};
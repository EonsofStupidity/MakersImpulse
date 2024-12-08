import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface SchemaVersion {
  id: string;
  version_number: number;
  description: string;
  applied_at: string;
  status: string;
}

interface SchemaVersionsProps {
  versions: SchemaVersion[];
}

const SchemaVersions = ({ versions }: SchemaVersionsProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Schema Versions</h3>
        <Button>Create Migration</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Version</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Applied At</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {versions.map((version) => (
            <TableRow key={version.id}>
              <TableCell>v{version.version_number}</TableCell>
              <TableCell>{version.description}</TableCell>
              <TableCell>{format(new Date(version.applied_at), 'PPp')}</TableCell>
              <TableCell>
                <Badge variant={version.status === 'pending' ? 'secondary' : 'default'}>
                  {version.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Button variant="outline" size="sm">View Details</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SchemaVersions;
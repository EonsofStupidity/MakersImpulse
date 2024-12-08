import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ContentTableProps {
  content: any[];
  isLoading: boolean;
  selectedItems: string[];
  onToggleItem: (id: string) => void;
  onToggleAll: (checked: boolean) => void;
}

const ContentTable = ({
  content,
  isLoading,
  selectedItems,
  onToggleItem,
  onToggleAll,
}: ContentTableProps) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={selectedItems.length === content?.length}
                onCheckedChange={onToggleAll}
              />
            </TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {content?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Checkbox
                  checked={selectedItems.includes(item.id)}
                  onCheckedChange={() => onToggleItem(item.id)}
                />
              </TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.content_type}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    item.status === "published"
                      ? "default"
                      : item.status === "draft"
                      ? "secondary"
                      : "destructive"
                  }
                >
                  {item.status}
                </Badge>
              </TableCell>
              <TableCell>{item.author?.username}</TableCell>
              <TableCell>
                {new Date(item.created_at).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default ContentTable;
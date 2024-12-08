import { Eye, MoreVertical, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ContentTableProps {
  content: any[];
  selectedItems: string[];
  onToggleItem: (id: string) => void;
  onToggleAll: (checked: boolean) => void;
}

const ContentTable = ({ content, selectedItems, onToggleItem, onToggleAll }: ContentTableProps) => {
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
            <TableHead className="w-12"></TableHead>
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
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="w-4 h-4 mr-2" />
                      Duplicate
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default ContentTable;
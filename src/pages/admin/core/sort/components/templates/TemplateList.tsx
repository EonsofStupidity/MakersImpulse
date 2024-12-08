import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Template, templateService } from "@/services/templateService";
import { Plus, MoreHorizontal, Pencil, Trash, Share } from "lucide-react";
import { format } from "date-fns";
import CreateTemplateDialog from "./CreateTemplateDialog";

export const TemplateList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: templates, isLoading } = useQuery({
    queryKey: ["templates"],
    queryFn: templateService.listTemplates
  });

  const deleteMutation = useMutation({
    mutationFn: templateService.deleteTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["templates"] });
      toast({
        title: "Template deleted",
        description: "The template has been successfully deleted."
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete template. Please try again.",
        variant: "destructive"
      });
    }
  });

  const filteredTemplates = templates?.filter(template =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: Template['status']) => {
    const variants = {
      draft: "secondary",
      published: "default",
      archived: "destructive"
    } as const;

    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Templates</h2>
          <p className="text-muted-foreground">
            Manage your data import templates
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Template
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <Input
          placeholder="Search templates..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Version</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTemplates?.map((template) => (
              <TableRow key={template.id}>
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium">{template.name}</div>
                    {template.description && (
                      <div className="text-sm text-muted-foreground">
                        {template.description}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(template.status)}</TableCell>
                <TableCell>v{template.version}</TableCell>
                <TableCell>
                  {format(new Date(template.updated_at), 'MMM d, yyyy')}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Share className="h-4 w-4 mr-2" />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => deleteMutation.mutate(template.id)}
                      >
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <CreateTemplateDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
};
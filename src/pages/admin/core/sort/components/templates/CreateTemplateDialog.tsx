import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { templateService } from "@/services/templateService";

interface CreateTemplateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreateTemplateDialog({
  open,
  onOpenChange,
}: CreateTemplateDialogProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: templateService.createTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["templates"] });
      toast({
        title: "Template created",
        description: "Your new template has been created successfully."
      });
      handleClose();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create template. Please try again.",
        variant: "destructive"
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate({
      name,
      description,
      is_public: isPublic,
      status: 'draft',
      field_mappings: {},
      validation_rules: {},
      metadata: {}
    });
  };

  const handleClose = () => {
    setName("");
    setDescription("");
    setIsPublic(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Template</DialogTitle>
          <DialogDescription>
            Create a new data import template. You can configure the fields and validation rules later.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Template Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter template name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter template description"
              rows={3}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="public">Make template public</Label>
            <Switch
              id="public"
              checked={isPublic}
              onCheckedChange={setIsPublic}
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createMutation.isPending}
            >
              Create Template
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
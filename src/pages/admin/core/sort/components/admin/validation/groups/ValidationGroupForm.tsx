import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ValidationGroupFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export const ValidationGroupForm = ({ onSubmit, onCancel }: ValidationGroupFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    group_type: "standard",
    priority: 0,
    metadata: {}
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="group_type">Group Type</Label>
        <Select
          value={formData.group_type}
          onValueChange={(value) => setFormData({ ...formData, group_type: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select group type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="standard">Standard</SelectItem>
            <SelectItem value="custom">Custom</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="priority">Priority</Label>
        <Input
          id="priority"
          type="number"
          value={formData.priority}
          onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) })}
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Create Group
        </Button>
      </div>
    </form>
  );
};
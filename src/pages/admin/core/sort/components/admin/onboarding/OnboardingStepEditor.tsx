import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface OnboardingStepEditorProps {
  step: any;
  onSave: (step: any) => void;
  onCancel: () => void;
}

export const OnboardingStepEditor = ({ step, onSave, onCancel }: OnboardingStepEditorProps) => {
  const [editedStep, setEditedStep] = useState(step);

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">
        {step.id ? "Edit Step" : "Create New Step"}
      </h3>
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={editedStep.title}
            onChange={(e) => setEditedStep({ ...editedStep, title: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={editedStep.description || ""}
            onChange={(e) => setEditedStep({ ...editedStep, description: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="content">Content (Markdown supported)</Label>
          <Textarea
            id="content"
            value={editedStep.content || ""}
            onChange={(e) => setEditedStep({ ...editedStep, content: e.target.value })}
            className="min-h-[200px]"
          />
        </div>

        <div>
          <Label htmlFor="order">Order</Label>
          <Input
            id="order"
            type="number"
            value={editedStep.order_index}
            onChange={(e) => setEditedStep({ ...editedStep, order_index: parseInt(e.target.value) })}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Label htmlFor="is_active">Active</Label>
          <Switch
            id="is_active"
            checked={editedStep.is_active}
            onCheckedChange={(checked) => setEditedStep({ ...editedStep, is_active: checked })}
          />
        </div>

        <div>
          <Label htmlFor="status">Status</Label>
          <Select
            value={editedStep.status}
            onValueChange={(value) => setEditedStep({ ...editedStep, status: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={() => onSave(editedStep)}>
            Save Changes
          </Button>
        </div>
      </div>
    </Card>
  );
};
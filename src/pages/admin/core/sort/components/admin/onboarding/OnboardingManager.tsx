import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";

interface OnboardingStep {
  id: string;
  key: string;
  title: string;
  description: string | null;
  content: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  created_by: string | null;
  published_version: number;
  status: 'draft' | 'published';
}

export const OnboardingManager = () => {
  const [editingStep, setEditingStep] = useState<Partial<OnboardingStep> | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: steps, isLoading } = useQuery({
    queryKey: ["onboarding-steps"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("onboarding_step_templates")
        .select("*")
        .order("order_index");
      
      if (error) throw error;
      return data as OnboardingStep[];
    },
  });

  const updateStep = useMutation({
    mutationFn: async (step: Partial<OnboardingStep>) => {
      const { error } = await supabase
        .from("onboarding_step_templates")
        .upsert({
          ...step,
          key: step.key || "",
          title: step.title || "",
          content: step.content || "",
          order_index: step.order_index || 0,
          updated_at: new Date().toISOString(),
          published_version: step.status === 'published' ? ((step.published_version || 1) + 1) : step.published_version
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["onboarding-steps"] });
      toast({
        title: "Success",
        description: "Onboarding step updated successfully",
      });
      setEditingStep(null);
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Onboarding Steps Manager</h2>
        <Button onClick={() => setEditingStep({
          key: "",
          title: "",
          content: "",
          order_index: (steps?.length || 0) + 1,
          is_active: true,
          status: "draft"
        })}>
          Add Step
        </Button>
      </div>

      <Card className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Active</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {steps?.map((step) => (
              <TableRow key={step.id}>
                <TableCell>{step.order_index}</TableCell>
                <TableCell>{step.title}</TableCell>
                <TableCell>{step.status}</TableCell>
                <TableCell>
                  <Switch 
                    checked={step.is_active}
                    onCheckedChange={(checked) => {
                      updateStep.mutate({ ...step, is_active: checked });
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingStep(step)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {editingStep && (
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={editingStep.title || ""}
                onChange={(e) => setEditingStep({ ...editingStep, title: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={editingStep.content || ""}
                onChange={(e) => setEditingStep({ ...editingStep, content: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="order">Order</Label>
              <Input
                id="order"
                type="number"
                value={editingStep.order_index || ""}
                onChange={(e) => setEditingStep({ ...editingStep, order_index: parseInt(e.target.value) })}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                value={editingStep.status || "draft"}
                onChange={(e) => setEditingStep({ ...editingStep, status: e.target.value as 'draft' | 'published' })}
                className="border rounded p-2"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setEditingStep(null)}>
                Cancel
              </Button>
              <Button onClick={() => updateStep.mutate(editingStep)}>
                Save Changes
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
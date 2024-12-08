import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ConditionEditor } from "./components/ConditionEditor";
import { ActionEditor } from "./components/ActionEditor";
import { TransformationRule, TransformationCondition } from "@/lib/transformations/types";

interface TransformationFormProps {
  onSave: (rule: TransformationRule) => void;
  initialData?: TransformationRule;
}

export const TransformationForm = ({ onSave, initialData }: TransformationFormProps) => {
  const [rule, setRule] = useState<TransformationRule>(initialData || {
    name: "",
    description: "",
    rule_type: "conditional",
    configuration: {
      conditions: [],
      actions: []
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(rule);
  };

  return (
    <Card className="p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Rule Name</Label>
          <Input
            id="name"
            value={rule.name}
            onChange={(e) => setRule({ ...rule, name: e.target.value })}
            placeholder="Enter rule name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={rule.description || ""}
            onChange={(e) => setRule({ ...rule, description: e.target.value })}
            placeholder="Enter rule description"
          />
        </div>

        <Tabs defaultValue="conditions" className="mt-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="conditions">Conditions</TabsTrigger>
            <TabsTrigger value="actions">Actions</TabsTrigger>
          </TabsList>

          <TabsContent value="conditions" className="mt-4">
            <ConditionEditor
              conditions={rule.configuration.conditions || []}
              onChange={(conditions) =>
                setRule({
                  ...rule,
                  configuration: { ...rule.configuration, conditions }
                })
              }
            />
          </TabsContent>

          <TabsContent value="actions" className="mt-4">
            <ActionEditor
              actions={rule.configuration.actions || []}
              onChange={(actions) =>
                setRule({
                  ...rule,
                  configuration: { ...rule.configuration, actions }
                })
              }
            />
          </TabsContent>
        </Tabs>

        <Button type="submit" className="w-full">
          Save Transformation Rule
        </Button>
      </form>
    </Card>
  );
};

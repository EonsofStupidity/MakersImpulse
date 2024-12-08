import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { ConditionEditor } from "./components/ConditionEditor";
import { ActionEditor } from "./components/ActionEditor";
import { RulePreview } from "./components/RulePreview";
import { TransformationRule } from "@/lib/transformations/types";

interface TransformationRuleEditorProps {
  initialRule?: TransformationRule;
  onSave: (rule: TransformationRule) => void;
}

export const TransformationRuleEditor = ({ initialRule, onSave }: TransformationRuleEditorProps) => {
  const [rule, setRule] = useState<TransformationRule>(initialRule || {
    name: "",
    description: "",
    rule_type: "conditional",
    configuration: {
      conditions: [],
      actions: []
    }
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSave(rule);
      toast({
        title: "Success",
        description: "Transformation rule saved successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save transformation rule",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
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
            <Input
              id="description"
              value={rule.description || ""}
              onChange={(e) => setRule({ ...rule, description: e.target.value })}
              placeholder="Enter rule description"
            />
          </div>
        </div>

        <Tabs defaultValue="conditions">
          <TabsList>
            <TabsTrigger value="conditions">Conditions</TabsTrigger>
            <TabsTrigger value="actions">Actions</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="conditions">
            <ConditionEditor
              conditions={rule.configuration.conditions}
              onChange={(conditions) =>
                setRule({
                  ...rule,
                  configuration: { ...rule.configuration, conditions }
                })
              }
            />
          </TabsContent>

          <TabsContent value="actions">
            <ActionEditor
              actions={rule.configuration.actions}
              onChange={(actions) =>
                setRule({
                  ...rule,
                  configuration: { ...rule.configuration, actions }
                })
              }
            />
          </TabsContent>

          <TabsContent value="preview">
            <RulePreview
              type={rule.rule_type}
              configuration={rule.configuration}
              script={rule.script}
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

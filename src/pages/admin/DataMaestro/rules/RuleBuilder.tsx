import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Button } from "@/components/ui/button";
import { Plus, GripVertical } from "lucide-react";
import { RuleCard } from "./RuleCard";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ValidationRule, ValidationRuleType } from "../types";

export const RuleBuilder = () => {
  const [rules, setRules] = useState<ValidationRule[]>([]);
  const { toast } = useToast();

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(rules);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setRules(items);
  };

  const addNewRule = () => {
    const newRule: ValidationRule = {
      name: `Rule ${rules.length + 1}`,
      rule_type: "required",
      configuration: {},
      is_active: true
    };
    setRules([...rules, newRule]);
  };

  const handleSave = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      for (const rule of rules) {
        const { error } = await supabase
          .from('validation_rules')
          .insert({
            name: rule.name,
            rule_type: rule.rule_type,
            configuration: rule.configuration,
            is_active: rule.is_active,
            description: rule.description,
            created_by: user?.id
          });

        if (error) throw error;
      }

      toast({
        title: "Success",
        description: "Rules saved successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save rules",
        variant: "destructive"
      });
    }
  };

  const handleUpdateRule = (index: number, updates: Partial<ValidationRule>) => {
    const newRules = [...rules];
    newRules[index] = { ...newRules[index], ...updates };
    setRules(newRules);
  };

  const handleDeleteRule = (index: number) => {
    const newRules = rules.filter((_, i) => i !== index);
    setRules(newRules);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Rule Builder</h2>
        <Button onClick={addNewRule}>
          <Plus className="w-4 h-4 mr-2" />
          Add Rule
        </Button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="rules">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {rules.map((rule, index) => (
                <Draggable
                  key={rule.id || `temp-${index}`}
                  draggableId={rule.id || `temp-${index}`}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      <div className="flex items-center gap-2">
                        <div {...provided.dragHandleProps}>
                          <GripVertical className="w-5 h-5 text-gray-400" />
                        </div>
                        <RuleCard
                          rule={rule}
                          onUpdate={(updates) => handleUpdateRule(index, updates)}
                          onDelete={() => handleDeleteRule(index)}
                        />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <Button onClick={handleSave} className="w-full">
        Save Rules
      </Button>
    </div>
  );
};
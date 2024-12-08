import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ValidationRuleField } from "./components/ValidationRuleField";
import { TagSystem } from "./components/TagSystem";
import { FieldSelector } from "./components/FieldSelector";
import { ErrorSummary } from "./components/ErrorSummary";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ValidationRulesInterfaceProps {
  fields: string[];
  validationRules: Record<string, any>;
  onUpdateRules: (rules: Record<string, any>) => void;
}

export const ValidationRulesInterface = ({
  fields,
  validationRules,
  onUpdateRules,
}: ValidationRulesInterfaceProps) => {
  const [selectedFields, setSelectedFields] = useState<string[]>(fields);
  const [errors, setErrors] = useState<any[]>([]);
  const [processedRows, setProcessedRows] = useState(0);
  const [totalRows, setTotalRows] = useState(100); // Example value

  const handleUpdateRule = (field: string, key: string, value: any) => {
    onUpdateRules({
      ...validationRules,
      [field]: {
        ...validationRules[field],
        [key]: value,
      },
    });
  };

  const handleUpdateTags = (field: string, tags: string[]) => {
    handleUpdateRule(field, 'tags', tags);
  };

  // Common tag suggestions based on field names
  const commonTags = [
    "required", "optional", "numeric", "text", "date", "email",
    "primary", "secondary", "unique", "indexed"
  ];

  // Calculate null threshold percentage
  const nullThreshold = (validationRules.nullThreshold || 0.3) * 100;

  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Field Selection</h3>
        <FieldSelector
          availableFields={fields}
          selectedFields={selectedFields}
          onUpdateSelection={setSelectedFields}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Null Value Threshold</h3>
        <div className="space-y-2">
          <Progress value={nullThreshold} className="h-2" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>0%</span>
            <span>{nullThreshold.toFixed(1)}% threshold</span>
            <span>100%</span>
          </div>
        </div>
        <Alert variant="default" className="bg-muted/50">
          <AlertDescription>
            Fields with null values exceeding {nullThreshold}% will be flagged during validation
          </AlertDescription>
        </Alert>
      </div>

      <div className="space-y-4">
        {selectedFields.map((field) => (
          <Collapsible key={field}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 w-full justify-between">
                <span>{field}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-4 space-y-4">
              <ValidationRuleField
                field={field}
                rules={validationRules[field]}
                onUpdateRule={handleUpdateRule}
              />
              <TagSystem
                tags={validationRules[field]?.tags || []}
                onUpdateTags={(tags) => handleUpdateTags(field, tags)}
                suggestions={commonTags}
              />
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>

      <ErrorSummary
        errors={errors}
        totalRows={totalRows}
        processedRows={processedRows}
      />
    </Card>
  );
};
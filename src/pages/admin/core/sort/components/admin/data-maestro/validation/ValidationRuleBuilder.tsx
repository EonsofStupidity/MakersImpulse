import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ValidationRule } from './types';

interface ValidationRuleBuilderProps {
  onSave: (rule: ValidationRule) => void;
  initialRule?: ValidationRule;
}

export const ValidationRuleBuilder = ({ onSave, initialRule }: ValidationRuleBuilderProps) => {
  const [rule, setRule] = useState<Partial<ValidationRule>>(initialRule || {
    type: 'required',
    errorMessage: '',
    params: {}
  });

  const handleSave = () => {
    if (rule.type) {
      onSave(rule as ValidationRule);
    }
  };

  return (
    <Card className="p-4 space-y-4">
      <div className="space-y-2">
        <Label>Rule Type</Label>
        <Select
          value={rule.type}
          onValueChange={(value) => setRule({ ...rule, type: value as ValidationRule['type'] })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select rule type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="required">Required</SelectItem>
            <SelectItem value="minLength">Minimum Length</SelectItem>
            <SelectItem value="maxLength">Maximum Length</SelectItem>
            <SelectItem value="pattern">Pattern Match</SelectItem>
            <SelectItem value="custom">Custom</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {rule.type === 'minLength' && (
        <div className="space-y-2">
          <Label>Minimum Length</Label>
          <Input
            type="number"
            value={rule.params?.min || ''}
            onChange={(e) => setRule({
              ...rule,
              params: { ...rule.params, min: parseInt(e.target.value) }
            })}
          />
        </div>
      )}

      {rule.type === 'maxLength' && (
        <div className="space-y-2">
          <Label>Maximum Length</Label>
          <Input
            type="number"
            value={rule.params?.max || ''}
            onChange={(e) => setRule({
              ...rule,
              params: { ...rule.params, max: parseInt(e.target.value) }
            })}
          />
        </div>
      )}

      {rule.type === 'pattern' && (
        <div className="space-y-2">
          <Label>Pattern (RegExp)</Label>
          <Input
            value={rule.params?.pattern || ''}
            onChange={(e) => setRule({
              ...rule,
              params: { ...rule.params, pattern: e.target.value }
            })}
          />
        </div>
      )}

      <div className="space-y-2">
        <Label>Error Message</Label>
        <Input
          value={rule.errorMessage || ''}
          onChange={(e) => setRule({ ...rule, errorMessage: e.target.value })}
          placeholder="Enter error message"
        />
      </div>

      <Button onClick={handleSave} className="w-full">
        Save Rule
      </Button>
    </Card>
  );
};
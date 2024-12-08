import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ValidationRule, ValidationRuleType } from '../components/types';
import { RuleForm } from './components/RuleForm';
import { RuleConfiguration } from './components/RuleConfiguration';

interface ValidationRuleBuilderProps {
  onSave: (rule: ValidationRule) => void;
  initialRule?: ValidationRule;
}

export const ValidationRuleBuilder = ({ onSave, initialRule }: ValidationRuleBuilderProps) => {
  const [rule, setRule] = useState<ValidationRule>(initialRule || {
    name: "",
    rule_type: "required",
    configuration: {},
    description: "",
    is_active: true
  });

  const handleSave = () => {
    if (rule.name && rule.rule_type) {
      onSave(rule);
    }
  };

  return (
    <Card className="p-6 space-y-6">
      <RuleForm
        rule={rule}
        onUpdate={(updates) => setRule({ ...rule, ...updates })}
      />

      <RuleConfiguration
        ruleType={rule.rule_type}
        configuration={rule.configuration || {}}
        onUpdate={(config) => setRule({ ...rule, configuration: config })}
      />

      <Button onClick={handleSave} className="w-full">
        Save Rule
      </Button>
    </Card>
  );
};
import { Card } from "@/components/ui/card";
import { ValidationRule } from "../components/types";
import { RuleList } from "./components/RuleList";
import { RuleFilters } from "./components/RuleFilters";
import { useState } from "react";

interface ValidationRulesInterfaceProps {
  rules: ValidationRule[];
  onUpdateRule: (rule: ValidationRule) => void;
  onDeleteRule: (ruleId: string) => void;
}

export const ValidationRulesInterface = ({
  rules,
  onUpdateRule,
  onDeleteRule,
}: ValidationRulesInterfaceProps) => {
  const [filter, setFilter] = useState("");
  
  const filteredRules = rules.filter(rule => 
    rule.name.toLowerCase().includes(filter.toLowerCase()) ||
    rule.description?.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Card className="p-6 space-y-6">
      <RuleFilters
        filter={filter}
        onFilterChange={setFilter}
      />
      <RuleList
        rules={filteredRules}
        onUpdateRule={onUpdateRule}
        onDeleteRule={onDeleteRule}
      />
    </Card>
  );
};
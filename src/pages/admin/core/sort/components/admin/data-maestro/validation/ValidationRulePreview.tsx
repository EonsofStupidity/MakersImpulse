import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ValidationRule } from './types';
import { validationService } from './ValidationService';

interface ValidationRulePreviewProps {
  rule: ValidationRule;
}

export const ValidationRulePreview = ({ rule }: ValidationRulePreviewProps) => {
  const [testValue, setTestValue] = useState('');
  const [validationResult, setValidationResult] = useState<{ isValid: boolean; errors: string[] }>({ 
    isValid: true, 
    errors: [] 
  });

  const handleTest = (value: string) => {
    setTestValue(value);
    const result = validationService.validateField('test', value);
    setValidationResult(result);
  };

  return (
    <Card className="p-4 space-y-4">
      <div className="space-y-2">
        <Label>Test Value</Label>
        <Input
          value={testValue}
          onChange={(e) => handleTest(e.target.value)}
          placeholder="Enter a value to test"
          className={validationResult.isValid ? '' : 'border-red-500'}
        />
      </div>

      {!validationResult.isValid && validationResult.errors.length > 0 && (
        <div className="text-sm text-red-500">
          {validationResult.errors.map((error, index) => (
            <div key={index}>{error}</div>
          ))}
        </div>
      )}

      <div className="text-sm">
        <strong>Rule Type:</strong> {rule.type}
        {rule.params && Object.keys(rule.params).length > 0 && (
          <div>
            <strong>Parameters:</strong>{' '}
            {Object.entries(rule.params).map(([key, value]) => (
              `${key}: ${value}`
            )).join(', ')}
          </div>
        )}
      </div>
    </Card>
  );
};
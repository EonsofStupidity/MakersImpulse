interface ValidationRule {
  field1: string;
  field2: string;
  operator: "equals" | "notEquals" | "greaterThan" | "lessThan";
  customLogic?: string;
}

export const validateCrossFieldRules = (data: any, rules: ValidationRule[]): string[] => {
  const errors: string[] = [];

  rules.forEach(rule => {
    const value1 = data[rule.field1];
    const value2 = data[rule.field2];

    switch (rule.operator) {
      case "equals":
        if (value1 !== value2) {
          errors.push(`${rule.field1} must equal ${rule.field2}`);
        }
        break;
      case "notEquals":
        if (value1 === value2) {
          errors.push(`${rule.field1} must not equal ${rule.field2}`);
        }
        break;
      case "greaterThan":
        if (Number(value1) <= Number(value2)) {
          errors.push(`${rule.field1} must be greater than ${rule.field2}`);
        }
        break;
      case "lessThan":
        if (Number(value1) >= Number(value2)) {
          errors.push(`${rule.field1} must be less than ${rule.field2}`);
        }
        break;
    }

    // Handle custom logic if provided
    if (rule.customLogic) {
      try {
        const customValidation = new Function('value1', 'value2', `return ${rule.customLogic}`);
        if (!customValidation(value1, value2)) {
          errors.push(`Custom validation failed for ${rule.field1} and ${rule.field2}`);
        }
      } catch (error) {
        console.error('Custom validation error:', error);
        errors.push(`Invalid custom validation logic for ${rule.field1} and ${rule.field2}`);
      }
    }
  });

  return errors;
};
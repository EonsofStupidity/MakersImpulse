import { createContext, useContext, useState, ReactNode } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { ValidationError } from '../types';

interface ValidationContextType {
  errors: ValidationError[];
  addError: (error: ValidationError) => void;
  clearErrors: () => void;
  validateField: (value: any, rules: any) => string[];
}

const ValidationContext = createContext<ValidationContextType | undefined>(undefined);

export const ValidationProvider = ({ children }: { children: ReactNode }) => {
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const { toast } = useToast();

  const addError = (error: ValidationError) => {
    setErrors(prev => [...prev, error]);
    toast({
      title: "Validation Error",
      description: `Row ${error.row}: ${error.errors.join(", ")}`,
      variant: "destructive",
    });
  };

  const clearErrors = () => {
    setErrors([]);
  };

  const validateField = (value: any, rules: any): string[] => {
    const fieldErrors: string[] = [];

    if (rules.required && !value) {
      fieldErrors.push("This field is required");
    }

    if (rules.minLength && value.length < rules.minLength) {
      fieldErrors.push(`Minimum length is ${rules.minLength}`);
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      fieldErrors.push(`Maximum length is ${rules.maxLength}`);
    }

    if (rules.pattern && !new RegExp(rules.pattern).test(value)) {
      fieldErrors.push("Invalid format");
    }

    return fieldErrors;
  };

  return (
    <ValidationContext.Provider value={{ errors, addError, clearErrors, validateField }}>
      {children}
    </ValidationContext.Provider>
  );
};

export const useValidation = () => {
  const context = useContext(ValidationContext);
  if (context === undefined) {
    throw new Error('useValidation must be used within a ValidationProvider');
  }
  return context;
};
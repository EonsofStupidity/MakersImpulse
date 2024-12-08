import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { TransformationRule, TransformationContext as ITransformationContext, TransformationResult } from './types';
import { transformationService } from './transformationService';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

const TransformationContext = createContext<ITransformationContext | undefined>(undefined);

export function TransformationProvider({ children }: { children: ReactNode }) {
  const [rules, setRules] = useState<TransformationRule[]>([]);
  const [activeRule, setActiveRule] = useState<TransformationRule | null>(null);
  const { toast } = useToast();

  const createRule = useCallback(async (rule: TransformationRule) => {
    try {
      const savedRule = await transformationService.saveRule(rule);
      setRules(prev => [...prev, savedRule]);
      toast({
        title: "Success",
        description: "Transformation rule created successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create transformation rule",
        variant: "destructive",
      });
      throw error;
    }
  }, [toast]);

  const updateRule = useCallback(async (id: string, rule: TransformationRule) => {
    try {
      const updatedRule = await transformationService.saveRule({ ...rule, id });
      setRules(prev => prev.map(r => r.id === id ? updatedRule : r));
      toast({
        title: "Success",
        description: "Transformation rule updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update transformation rule",
        variant: "destructive",
      });
      throw error;
    }
  }, [toast]);

  const deleteRule = useCallback(async (id: string) => {
    try {
      await supabase.from('transformation_rules').delete().eq('id', id);
      setRules(prev => prev.filter(r => r.id !== id));
      if (activeRule?.id === id) {
        setActiveRule(null);
      }
      toast({
        title: "Success",
        description: "Transformation rule deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete transformation rule",
        variant: "destructive",
      });
      throw error;
    }
  }, [activeRule, toast]);

  const executeTransformation = useCallback(async (value: any, ruleId: string): Promise<TransformationResult> => {
    const rule = rules.find(r => r.id === ruleId);
    if (!rule) {
      return { success: false, value, error: 'Transformation rule not found' };
    }
    return transformationService.executeTransformation(rule, value);
  }, [rules]);

  return (
    <TransformationContext.Provider
      value={{
        rules,
        activeRule,
        setActiveRule,
        createRule,
        updateRule,
        deleteRule,
        executeTransformation
      }}
    >
      {children}
    </TransformationContext.Provider>
  );
}

export function useTransformation() {
  const context = useContext(TransformationContext);
  if (context === undefined) {
    throw new Error('useTransformation must be used within a TransformationProvider');
  }
  return context;
}
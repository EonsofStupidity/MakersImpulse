import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { SettingsFormHeader } from "./SettingsFormHeader";
import { SettingsFormContent } from "./SettingsFormContent";
import { UseFormReturn } from "react-hook-form";
import { SettingsFormData } from "@/types/theme/core/form";

interface SettingsFormContainerProps {
  form: UseFormReturn<SettingsFormData>;
  isSaving: boolean;
  onResetClick: () => void;
}

export const SettingsFormContainer: React.FC<SettingsFormContainerProps> = ({
  form,
  isSaving,
  onResetClick
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <Card className="p-6 bg-gray-800/50 border border-white/10 backdrop-blur-sm">
        <SettingsFormHeader 
          onResetClick={onResetClick}
          isSaving={isSaving}
        />
        <SettingsFormContent form={form} isSaving={isSaving} />
      </Card>
    </motion.div>
  );
};
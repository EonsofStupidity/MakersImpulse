import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ThemeBase } from "@/types";
import { useSettingsForm } from "../hooks/useSettingsForm";
import { ThemeFormContainer } from "./ThemeFormContainer";
import { ThemePreviewContainer } from "./ThemePreviewContainer";
import { settingsSchema } from "@/types/theme/schema";

export const ThemeSettingsForm = () => {
  const {
    settings,
    isLoading,
    isSaving,
    logoFile,
    faviconFile,
    handleSettingsUpdate,
    handleResetToDefault,
  } = useSettingsForm();

  const form = useForm<ThemeBase>({
    resolver: zodResolver(settingsSchema),
    defaultValues: settings || undefined,
  });

  React.useEffect(() => {
    if (settings) {
      form.reset(settings);
    }
  }, [settings, form]);

  React.useEffect(() => {
    const subscription = form.watch((value) => {
      if (value) {
        handleSettingsUpdate(form.getValues());
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch, handleSettingsUpdate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mx-[5%] min-h-[calc(100vh-4rem)]">
      <ThemeFormContainer
        form={form}
        isSaving={isSaving}
        onResetClick={handleResetToDefault}
      />
      <ThemePreviewContainer
        settings={settings}
        logoFile={logoFile}
        faviconFile={faviconFile}
      />
    </div>
  );
};

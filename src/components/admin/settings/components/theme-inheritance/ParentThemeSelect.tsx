import React from 'react';
import { UseFormReturn, ThemeBase } from '@/types';
import { 
  Accordion,
  AccordionContent, 
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Select } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useParentTheme } from './useParentTheme';

interface ParentThemeSelectProps {
  form: UseFormReturn<ThemeBase>;
}

export const ParentThemeSelect: React.FC<ParentThemeSelectProps> = ({ form }) => {
  const parentThemeId = form.watch("parent_theme_id");
  const { parentTheme, isLoading } = useParentTheme(parentThemeId);

  return (
    <AccordionItem value="parent-theme">
      <AccordionTrigger className="text-lg font-semibold text-white">
        Parent Theme
      </AccordionTrigger>
      <AccordionContent className="space-y-4 pt-4">
        <div className="grid gap-4">
          <Label htmlFor="parent-theme-select">Select Parent Theme</Label>
          <Select
            id="parent-theme-select"
            value={parentThemeId || ""}
            onValueChange={(value) => form.setValue("parent_theme_id", value)}
          >
            <Select.Trigger>
              <Select.Value placeholder="Select a parent theme" />
            </Select.Trigger>
            <Select.Content>
              {isLoading ? (
                <Select.Item value="" disabled>
                  Loading...
                </Select.Item>
              ) : (
                parentTheme && (
                  <Select.Item value={parentTheme.id}>
                    {parentTheme.name}
                  </Select.Item>
                )
              )}
            </Select.Content>
          </Select>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

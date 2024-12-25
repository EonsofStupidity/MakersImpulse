import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ThemeBase } from '@/types';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useParentTheme } from './useParentTheme';

interface ParentThemeSelectProps {
  form: UseFormReturn<ThemeBase>;
}

export const ParentThemeSelect: React.FC<ParentThemeSelectProps> = ({ form }) => {
  const parentThemeId = form.watch("parent_theme_id");
  const { parentTheme, isLoading } = useParentTheme(parentThemeId);

  return (
    <div className="grid gap-4">
      <Label htmlFor="parent-theme-select">Select Parent Theme</Label>
      <Select
        value={parentThemeId || ""}
        onValueChange={(value) => form.setValue("parent_theme_id", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a parent theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">None (Standalone Theme)</SelectItem>
          {isLoading ? (
            <SelectItem value="" disabled>
              Loading...
            </SelectItem>
          ) : (
            parentTheme && (
              <SelectItem value={parentTheme.id}>
                {parentTheme.name}
              </SelectItem>
            )
          )}
        </SelectContent>
      </Select>
    </div>
  );
};
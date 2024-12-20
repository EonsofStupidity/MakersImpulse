import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Card } from '@/components/ui/card';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { BuildFormData } from '@/types/builds';

interface BuildBasicSectionProps {
  form: UseFormReturn<BuildFormData>;
}

const BuildBasicSection: React.FC<BuildBasicSectionProps> = ({ form }) => {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Build Name</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white/5" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} className="bg-white/5" rows={4} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </Card>
  );
};

export default BuildBasicSection;
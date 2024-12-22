import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Card } from '@/components/ui/card';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { BuildFormData } from '@/types/builds';

interface BuildVolumeSectionProps {
  form: UseFormReturn<BuildFormData>;
}

const BuildVolumeSection: React.FC<BuildVolumeSectionProps> = ({ form }) => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Build Volume</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <FormField
          control={form.control}
          name="buildVolume.x"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Width (X)</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  type="number" 
                  className="bg-white/5"
                  onChange={e => field.onChange(Number(e.target.value))}
                  value={field.value || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="buildVolume.y"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Depth (Y)</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  type="number" 
                  className="bg-white/5"
                  onChange={e => field.onChange(Number(e.target.value))}
                  value={field.value || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="buildVolume.z"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Height (Z)</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  type="number" 
                  className="bg-white/5"
                  onChange={e => field.onChange(Number(e.target.value))}
                  value={field.value || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="buildVolume.units"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Units</FormLabel>
              <FormControl>
                <select 
                  {...field} 
                  className="w-full h-10 rounded-md border border-input bg-white/5 px-3 py-2"
                  value={field.value || ''}
                >
                  <option value="mm">Millimeters (mm)</option>
                  <option value="cm">Centimeters (cm)</option>
                  <option value="inches">Inches</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </Card>
  );
};

export default BuildVolumeSection;
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";

interface EntryFormProps {
  entry: any;
  onSave: (data: any) => void;
}

export const EntryForm = ({ entry, onSave }: EntryFormProps) => {
  const { register, handleSubmit, formState: { isDirty } } = useForm({
    defaultValues: entry?.entry_data || {},
  });

  return (
    <form onSubmit={handleSubmit(onSave)} className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Edit Entry</h3>
        <Button type="submit" disabled={!isDirty}>
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      {Object.entries(entry?.entry_data || {}).map(([field, value]) => (
        <div key={field} className="space-y-2">
          <Label htmlFor={field}>{field}</Label>
          <Input
            id={field}
            {...register(field)}
            defaultValue={value as string}
          />
        </div>
      ))}
    </form>
  );
};
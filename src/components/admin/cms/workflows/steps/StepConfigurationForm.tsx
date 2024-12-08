import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const stepConfigSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  configuration: z.record(z.any()).optional(),
});

type StepConfigFormData = z.infer<typeof stepConfigSchema>;

interface StepConfigurationFormProps {
  stepType: string;
  initialData?: StepConfigFormData;
  onSubmit: (data: StepConfigFormData) => void;
}

export const StepConfigurationForm = ({
  stepType,
  initialData,
  onSubmit,
}: StepConfigurationFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<StepConfigFormData>({
    resolver: zodResolver(stepConfigSchema),
    defaultValues: initialData,
  });

  return (
    <Card className="p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="name">Step Name</Label>
          <Input id="name" {...register("name")} />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" {...register("description")} />
        </div>

        {stepType === "user_input" && (
          <div>
            <Label>Input Fields</Label>
            {/* Add dynamic field configuration here */}
          </div>
        )}

        {stepType === "approval" && (
          <div>
            <Label>Approvers</Label>
            {/* Add approver selection here */}
          </div>
        )}

        {stepType === "notification" && (
          <div>
            <Label>Message Template</Label>
            <Textarea {...register("configuration.message")} />
          </div>
        )}

        {stepType === "condition" && (
          <div>
            <Label>Condition Expression</Label>
            <Input {...register("configuration.condition")} />
          </div>
        )}

        <Button type="submit">Save Step</Button>
      </form>
    </Card>
  );
};
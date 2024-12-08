import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const printerBuildSchema = z.object({
  printer_name: z.string().min(3, "Name must be at least 3 characters"),
  build_type: z.enum(["custom", "kit"]),
  build_volume: z.object({
    x: z.number(),
    y: z.number(),
    z: z.number(),
  }),
  aluminum_extrusion_details: z.string(),
  mcu_id: z.string().optional(),
  kinematics: z.enum(["cartesian", "corexy", "delta"]),
  belt_details: z.string(),
  heatbed_id: z.string().optional(),
  hotend_id: z.string().optional(),
  extruder_id: z.string().optional(),
  power_supply_details: z.string(),
  sbc_details: z.string(),
  expansion_cards: z.string(),
  enclosure_details: z.string(),
  motion_system: z.string(),
  difficulty: z.enum(["beginner", "intermediate", "advanced", "expert"]),
});

type PrinterBuildFormData = z.infer<typeof printerBuildSchema>;

export const PrinterBuildForm = () => {
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<PrinterBuildFormData>({
    resolver: zodResolver(printerBuildSchema),
  });

  const onSubmit = async (data: PrinterBuildFormData) => {
    try {
      // Submit to database
      toast({
        title: "Success",
        description: "Printer build configuration saved successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save printer build configuration",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="printer_name">Printer Name</Label>
            <Input id="printer_name" {...register("printer_name")} />
            {errors.printer_name && (
              <p className="text-sm text-red-500 mt-1">{errors.printer_name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="build_type">Build Type</Label>
            <Select onValueChange={(value) => register("build_type").onChange({ target: { value } })}>
              <SelectTrigger>
                <SelectValue placeholder="Select build type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="custom">Custom</SelectItem>
                <SelectItem value="kit">Kit</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Build Volume (mm)</Label>
            <div className="grid grid-cols-3 gap-2">
              <Input placeholder="X" type="number" {...register("build_volume.x", { valueAsNumber: true })} />
              <Input placeholder="Y" type="number" {...register("build_volume.y", { valueAsNumber: true })} />
              <Input placeholder="Z" type="number" {...register("build_volume.z", { valueAsNumber: true })} />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="kinematics">Kinematics</Label>
            <Select onValueChange={(value) => register("kinematics").onChange({ target: { value } })}>
              <SelectTrigger>
                <SelectValue placeholder="Select kinematics" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cartesian">Cartesian</SelectItem>
                <SelectItem value="corexy">CoreXY</SelectItem>
                <SelectItem value="delta">Delta</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="difficulty">Difficulty Level</Label>
            <Select onValueChange={(value) => register("difficulty").onChange({ target: { value } })}>
              <SelectTrigger>
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
                <SelectItem value="expert">Expert</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="aluminum_extrusion_details">Aluminum Extrusion Details</Label>
          <Textarea id="aluminum_extrusion_details" {...register("aluminum_extrusion_details")} />
        </div>

        <div>
          <Label htmlFor="motion_system">Motion System Details</Label>
          <Textarea id="motion_system" {...register("motion_system")} 
            placeholder="Describe the linear rails, lead rods, belts, etc." />
        </div>

        <div>
          <Label htmlFor="belt_details">Belts and Pulleys</Label>
          <Textarea id="belt_details" {...register("belt_details")} />
        </div>

        <div>
          <Label htmlFor="power_supply_details">Power Supply Details</Label>
          <Textarea id="power_supply_details" {...register("power_supply_details")} />
        </div>

        <div>
          <Label htmlFor="sbc_details">SBC Details</Label>
          <Textarea id="sbc_details" {...register("sbc_details")} />
        </div>

        <div>
          <Label htmlFor="expansion_cards">Expansion Cards</Label>
          <Textarea id="expansion_cards" {...register("expansion_cards")} />
        </div>

        <div>
          <Label htmlFor="enclosure_details">Enclosure Details</Label>
          <Textarea id="enclosure_details" {...register("enclosure_details")} />
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : null}
        Save Printer Build
      </Button>
    </form>
  );
};
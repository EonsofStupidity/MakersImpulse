import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BasicInfoStepProps {
  initialData: any;
  onComplete: (data: any) => void;
}

export const BasicInfoStep = ({ initialData, onComplete }: BasicInfoStepProps) => {
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
    build_type: initialData.build_type || "basic",
    estimated_cost: initialData.estimated_cost || "",
    difficulty_level: initialData.difficulty_level || "beginner",
    build_time_hours: initialData.build_time_hours || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Build Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Enter a title for your build"
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe your build"
            required
          />
        </div>

        <div>
          <Label htmlFor="build_type">Build Type</Label>
          <Select
            value={formData.build_type}
            onValueChange={(value) => setFormData({ ...formData, build_type: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select build type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="basic">Basic</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
              <SelectItem value="professional">Professional</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="estimated_cost">Estimated Cost (USD)</Label>
          <Input
            id="estimated_cost"
            type="number"
            value={formData.estimated_cost}
            onChange={(e) => setFormData({ ...formData, estimated_cost: e.target.value })}
            placeholder="Enter estimated cost"
          />
        </div>

        <div>
          <Label htmlFor="difficulty_level">Difficulty Level</Label>
          <Select
            value={formData.difficulty_level}
            onValueChange={(value) => setFormData({ ...formData, difficulty_level: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select difficulty level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
              <SelectItem value="expert">Expert</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="build_time_hours">Build Time (Hours)</Label>
          <Input
            id="build_time_hours"
            type="number"
            value={formData.build_time_hours}
            onChange={(e) => setFormData({ ...formData, build_time_hours: e.target.value })}
            placeholder="Estimated build time in hours"
          />
        </div>
      </div>

      <Button type="submit">Next Step</Button>
    </form>
  );
};
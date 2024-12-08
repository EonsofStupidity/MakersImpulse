import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronRight } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface CategoryFormProps {
  formData: {
    name: string;
    slug: string;
  };
  setFormData: (data: any) => void;
  onNext: () => void;
}

export const CategoryForm = ({ formData, setFormData, onNext }: CategoryFormProps) => {
  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const handleNameChange = (value: string) => {
    setFormData({ 
      ...formData, 
      name: value,
      slug: generateSlug(value)
    });
  };

  const isValid = formData.name.length >= 3 && formData.slug.length >= 3;

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name">Category Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => handleNameChange(e.target.value)}
          placeholder="Enter category name"
          required
        />
      </div>
      <div>
        <Label htmlFor="slug">Slug</Label>
        <Input
          id="slug"
          value={formData.slug}
          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          placeholder="category-slug"
          required
        />
        <p className="text-sm text-muted-foreground mt-1">
          This will be used in URLs. Auto-generated from name but can be customized.
        </p>
      </div>

      {!isValid && (
        <Alert>
          <AlertDescription>
            Both name and slug must be at least 3 characters long.
          </AlertDescription>
        </Alert>
      )}

      <Button
        type="button"
        onClick={onNext}
        disabled={!isValid}
        className="w-full"
      >
        Next <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};
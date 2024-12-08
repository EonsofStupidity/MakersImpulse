import { Card } from "@/components/ui/card";

interface ReviewStepProps {
  data: any;
  onSubmit?: () => void;
  isSubmitting?: boolean;
  onBack?: () => void;
}

const ReviewStep = ({ data, onSubmit, isSubmitting, onBack }: ReviewStepProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Review Component</h3>
      <Card className="p-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium">Basic Information</h4>
            <p>Name: {data.basic.name}</p>
            <p>Manufacturer: {data.basic.manufacturer}</p>
            <p>Summary: {data.basic.summary}</p>
          </div>
          <div>
            <h4 className="font-medium">Technical Specifications</h4>
            <p>Cost: ${data.specs.cost_usd}</p>
          </div>
        </div>
        <div className="mt-4">
          <h4 className="font-medium">Categories</h4>
          <div className="flex flex-wrap gap-2">
            {data.categories.map((category: string) => (
              <span key={category} className="px-2 py-1 bg-secondary rounded-full text-sm">
                {category}
              </span>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ReviewStep;
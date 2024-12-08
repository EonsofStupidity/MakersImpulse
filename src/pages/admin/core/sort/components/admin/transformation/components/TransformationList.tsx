import { useQuery } from '@tanstack/react-query';
import { transformationService } from '@/lib/transformations/transformationService';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil, Trash } from 'lucide-react';

export const TransformationList = () => {
  const { data: rules = [], isLoading } = useQuery({
    queryKey: ['transformation-rules'],
    queryFn: transformationService.getRules
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      {rules.map((rule) => (
        <Card key={rule.id} className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{rule.name}</h3>
              {rule.description && (
                <p className="text-sm text-muted-foreground">{rule.description}</p>
              )}
              <div className="mt-2">
                <span className="text-sm font-medium">Type: </span>
                <span className="text-sm">{rule.rule_type}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
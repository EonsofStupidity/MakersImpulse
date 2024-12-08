import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface ReviewSectionProps {
  config: {
    tableName: string;
    relationships: Array<{
      source: string;
      target: string;
      type: 'one-to-one' | 'one-to-many' | 'many-to-many';
    }>;
    tags: string[];
    validationRules: Record<string, any>;
  };
}

export const ReviewSection = ({ config }: ReviewSectionProps) => {
  return (
    <Card className="p-4">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Table Configuration</h3>
          <p className="text-sm text-muted-foreground">Table Name: {config.tableName}</p>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Relationships</h3>
          {config.relationships.length > 0 ? (
            <ul className="space-y-2">
              {config.relationships.map((rel, index) => (
                <li key={index} className="text-sm">
                  {rel.source} → {rel.type} → {rel.target}
                </li>
              ))}
            </ul>
          ) : (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>No relationships defined</AlertDescription>
            </Alert>
          )}
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Tags</h3>
          {config.tags.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {config.tags.map((tag, index) => (
                <span key={index} className="px-2 py-1 bg-secondary rounded-md text-sm">
                  {tag}
                </span>
              ))}
            </div>
          ) : (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>No tags defined</AlertDescription>
            </Alert>
          )}
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Validation Rules</h3>
          {Object.keys(config.validationRules).length > 0 ? (
            <div className="space-y-2">
              {Object.entries(config.validationRules).map(([field, rules]) => (
                <div key={field} className="text-sm">
                  <strong>{field}:</strong> {JSON.stringify(rules)}
                </div>
              ))}
            </div>
          ) : (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>No validation rules defined</AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </Card>
  );
};
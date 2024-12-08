import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileUp, HelpCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { DocumentationSearch } from "../help/DocumentationSearch";
import { StepHelp } from "../help/StepHelp";

interface WelcomeStepProps {
  onNext: () => void;
  helpContent?: {
    title: string;
    content: string;
  };
}

export const WelcomeStep = ({ onNext, helpContent }: WelcomeStepProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <FileUp className="w-12 h-12 mx-auto text-primary" />
        <h1 className="text-2xl font-bold">{helpContent?.title || "Welcome to CSV Import Wizard"}</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          {helpContent?.content || "This wizard will guide you through the process of importing CSV data into your database."}
        </p>
      </div>

      <Card className="p-6">
        <h3 className="font-medium mb-4 flex items-center gap-2">
          <HelpCircle className="w-4 h-4" />
          What to expect
        </h3>
        <ul className="space-y-2 list-disc list-inside text-muted-foreground">
          <li>Define your table structure and fields</li>
          <li>Map relationships with existing data</li>
          <li>Set up validation rules</li>
          <li>Preview and validate your data</li>
          <li>Review and complete the import</li>
        </ul>
      </Card>

      <DocumentationSearch />
      <StepHelp content={helpContent} />

      <Alert>
        <AlertDescription>
          Make sure your CSV file is properly formatted and contains all required data before proceeding.
        </AlertDescription>
      </Alert>

      <div className="flex justify-center">
        <Button onClick={onNext} size="lg">
          Start Import Configuration
        </Button>
      </div>
    </div>
  );
};
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Image, Info, Upload } from "lucide-react";

interface WizardNavigationProps {
  currentStep: string;
}

export const WizardNavigation = ({ currentStep }: WizardNavigationProps) => {
  return (
    <TabsList className="grid w-full grid-cols-4">
      <TabsTrigger value="basic-info" disabled={currentStep !== "basic-info"}>
        <Info className="w-4 h-4 mr-2" />
        Basic Info
      </TabsTrigger>
      <TabsTrigger value="images" disabled={currentStep !== "images"}>
        <Image className="w-4 h-4 mr-2" />
        Images
      </TabsTrigger>
      <TabsTrigger value="verification" disabled={currentStep !== "verification"}>
        <Check className="w-4 h-4 mr-2" />
        Verification
      </TabsTrigger>
      <TabsTrigger value="review" disabled={currentStep !== "review"}>
        <Upload className="w-4 h-4 mr-2" />
        Review
      </TabsTrigger>
    </TabsList>
  );
};
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { HelpCircle } from "lucide-react";

interface StepHelpProps {
  content?: {
    title: string;
    content: string;
  };
}

export const StepHelp = ({ content }: StepHelpProps) => {
  if (!content) return null;

  return (
    <div className="mb-6">
      <HoverCard>
        <HoverCardTrigger asChild>
          <div className="flex items-center gap-2 text-sm text-muted-foreground cursor-help">
            <HelpCircle className="w-4 h-4" />
            <span>Need help with this step?</span>
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="space-y-2">
            <h4 className="font-medium">{content.title}</h4>
            <p className="text-sm text-muted-foreground">{content.content}</p>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComponentFormFieldProps {
  label: string;
  name: string;
  type?: string;
  step?: string;
  register: any;
  error?: any;
  tooltip?: string;
  helpText?: string;
  required?: boolean;
  className?: string;
}

export const ComponentFormField = ({
  label,
  name,
  type = "text",
  step,
  register,
  error,
  tooltip,
  helpText,
  required,
  className
}: ComponentFormFieldProps) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const HelpContent = () => (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">{helpText}</p>
      {tooltip && <p className="text-sm font-medium">{tooltip}</p>}
    </div>
  );

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center gap-2">
        <Label htmlFor={name} className="flex items-center gap-1">
          {label}
          {required && <span className="text-red-500">*</span>}
          {(tooltip || helpText) && isMobile ? (
            <Sheet>
              <SheetTrigger>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </SheetTrigger>
              <SheetContent side="bottom">
                <SheetHeader>
                  <SheetTitle>{label}</SheetTitle>
                  <SheetDescription>
                    <HelpContent />
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          ) : (tooltip || helpText) ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <HelpContent />
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : null}
        </Label>
      </div>
      <Input
        id={name}
        type={type}
        step={step}
        {...register(name)}
        className={cn(
          error ? "border-red-500" : "",
          "touch-manipulation", // Better touch target
          "text-base md:text-sm", // Larger text on mobile
          "h-12 md:h-10" // Taller input on mobile
        )}
      />
      {error && (
        <p className="text-sm text-red-500 mt-1">{error.message}</p>
      )}
    </div>
  );
};
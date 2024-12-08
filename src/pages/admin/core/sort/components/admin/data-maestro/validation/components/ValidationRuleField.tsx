import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ValidationRuleFieldProps {
  field: string;
  rules: any;
  onUpdateRule: (field: string, key: string, value: any) => void;
}

export const ValidationRuleField = ({ field, rules, onUpdateRule }: ValidationRuleFieldProps) => {
  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <div className="flex items-center justify-between">
        <Label className="flex items-center gap-2">
          {field}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Configure validation rules for this field</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Label>
        <Switch
          checked={rules?.required || false}
          onCheckedChange={(checked) => onUpdateRule(field, 'required', checked)}
        />
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Pattern Type</Label>
            <Select
              value={rules?.patternType || ''}
              onValueChange={(value) => onUpdateRule(field, 'patternType', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select pattern type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="custom">Custom Regex</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="url">URL</SelectItem>
                <SelectItem value="numeric">Numeric</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {rules?.patternType === 'custom' && (
            <div>
              <Label>Custom Pattern</Label>
              <Input
                value={rules?.pattern || ''}
                onChange={(e) => onUpdateRule(field, 'pattern', e.target.value)}
                placeholder="Enter regex pattern"
              />
            </div>
          )}
        </div>

        <div>
          <Label>Allowed Characters</Label>
          <Input
            value={rules?.allowedChars || ''}
            onChange={(e) => onUpdateRule(field, 'allowedChars', e.target.value)}
            placeholder="e.g., a-zA-Z0-9"
          />
        </div>
      </div>
    </div>
  );
};
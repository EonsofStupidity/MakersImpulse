import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export const CodeEditor = ({ value, onChange }: CodeEditorProps) => {
  const [error, setError] = useState<string | null>(null);

  const validateCode = () => {
    try {
      // Basic validation - check if it's valid JavaScript
      new Function(value);
      setError(null);
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return (
    <Card className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">JavaScript Transformation</span>
        <Button size="sm" variant="outline" onClick={validateCode}>
          <Play className="w-4 h-4 mr-2" />
          Validate
        </Button>
      </div>

      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="font-mono min-h-[200px]"
        placeholder="// Write your transformation code here
function transform(value) {
  // Transform the value
  return value;
}"
      />

      {error && (
        <div className="text-sm text-red-500">
          {error}
        </div>
      )}
    </Card>
  );
};
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface CustomFunctionEditorProps {
  initialFunction: string;
  onSave: (functionBody: string) => void;
}

export const CustomFunctionEditor = ({ initialFunction, onSave }: CustomFunctionEditorProps) => {
  const [functionBody, setFunctionBody] = useState(initialFunction);

  return (
    <div className="space-y-4">
      <Textarea
        value={functionBody}
        onChange={(e) => setFunctionBody(e.target.value)}
        className="font-mono min-h-[200px]"
        placeholder="Enter your custom validation function..."
      />
      <Button onClick={() => onSave(functionBody)}>Save Function</Button>
    </div>
  );
};
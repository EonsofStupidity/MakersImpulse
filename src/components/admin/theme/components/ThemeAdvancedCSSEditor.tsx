import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface AdvancedCSSEditorProps {
  currentCSS: string;
  onSave: (css: string) => void;
  onReset: () => void;
}

export const AdvancedCSSEditor: React.FC<AdvancedCSSEditorProps> = ({
  currentCSS,
  onSave,
  onReset
}) => {
  const [css, setCSS] = React.useState(currentCSS);

  const handleSave = () => {
    onSave(css);
  };

  return (
    <Card className="p-4 space-y-4">
      <h3 className="text-lg font-medium">Advanced CSS Editor</h3>
      <Textarea
        value={css}
        onChange={(e) => setCSS(e.target.value)}
        className="min-h-[200px] font-mono"
      />
      <div className="flex gap-2">
        <Button onClick={handleSave}>Save CSS</Button>
        <Button variant="outline" onClick={onReset}>
          Reset to Default
        </Button>
      </div>
    </Card>
  );
};
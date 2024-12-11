import React from 'react';
import { diffWords } from 'diff';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';

interface RevisionDiffProps {
  oldContent: string;
  newContent: string;
}

export const RevisionDiff: React.FC<RevisionDiffProps> = ({ oldContent, newContent }) => {
  const diff = diffWords(oldContent, newContent);

  return (
    <Card className="p-4 bg-background/50 backdrop-blur-sm border-primary/20">
      <ScrollArea className="h-[400px]">
        <div className="font-mono text-sm whitespace-pre-wrap">
          {diff.map((part, index) => (
            <span
              key={index}
              className={
                part.added
                  ? 'bg-green-500/20 text-green-400'
                  : part.removed
                  ? 'bg-red-500/20 text-red-400 line-through'
                  : 'text-zinc-400'
              }
            >
              {part.value}
            </span>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};
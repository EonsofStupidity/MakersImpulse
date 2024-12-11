import React, { useState, useCallback, useMemo } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { DiffSectionProps, DiffChange } from '../types/diff';

export const DiffSection: React.FC<DiffSectionProps> = ({
  content,
  isExpanded: initialIsExpanded = true,
  onToggle,
  contextLines = 3,
  showLineNumbers = true,
  metadata
}) => {
  const [isExpanded, setIsExpanded] = useState(initialIsExpanded);
  const [contextSize, setContextSize] = useState(contextLines);

  const toggleExpanded = useCallback(() => {
    setIsExpanded(!isExpanded);
    onToggle?.();
  }, [isExpanded, onToggle]);

  const expandContext = useCallback(() => {
    setContextSize(prev => prev + 3);
  }, []);

  const visibleContent = useMemo(() => {
    if (isExpanded) {
      return content;
    }
    
    // Show only the first and last few lines when collapsed
    const start = content.slice(0, contextSize);
    const end = content.slice(-contextSize);
    
    if (content.length <= contextSize * 2) {
      return content;
    }
    
    return [
      ...start,
      { value: '...', added: false, removed: false },
      ...end
    ];
  }, [content, isExpanded, contextSize]);

  const renderLine = (line: DiffChange, index: number) => {
    const lineClass = `
      ${line.added ? 'bg-green-500/20 text-green-400' : ''}
      ${line.removed ? 'bg-red-500/20 text-red-400 line-through' : ''}
      ${!line.added && !line.removed ? 'text-zinc-400' : ''}
      p-1 font-mono text-sm whitespace-pre-wrap
    `;

    return (
      <div key={index} className={lineClass}>
        {showLineNumbers && (
          <span className="inline-block w-12 text-right pr-4 text-zinc-500 select-none">
            {line.lineNumber || index + 1}
          </span>
        )}
        <span>{line.value}</span>
      </div>
    );
  };

  return (
    <Card className="relative">
      <div className="absolute right-2 top-2 flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleExpanded}
          className="h-8 w-8 p-0"
          aria-label={isExpanded ? 'Collapse section' : 'Expand section'}
        >
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </div>
      
      {metadata && (
        <div className="px-4 py-2 border-b border-border/50 text-sm text-muted-foreground">
          Lines {metadata.startLine}-{metadata.endLine} • {metadata.type}
        </div>
      )}

      <ScrollArea className={`${isExpanded ? 'max-h-[400px]' : 'max-h-[200px]'}`}>
        <div className="p-4">
          {visibleContent.map((line, index) => renderLine(line, index))}
        </div>
      </ScrollArea>

      {!isExpanded && content.length > contextSize * 2 && (
        <div className="p-2 text-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={expandContext}
            className="text-xs"
          >
            Show more context
          </Button>
        </div>
      )}
    </Card>
  );
};
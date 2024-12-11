import React, { useState, useCallback, useMemo } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useVirtualizer } from '@tanstack/react-virtual';
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
  const parentRef = React.useRef<HTMLDivElement>(null);

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

  const rowVirtualizer = useVirtualizer({
    count: visibleContent.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 24, // Estimated height of each row
    overscan: 5
  });

  const renderLine = (line: DiffChange, index: number) => {
    const lineClass = `
      ${line.added ? 'bg-green-500/20 text-green-400' : ''}
      ${line.removed ? 'bg-red-500/20 text-red-400 line-through' : ''}
      ${!line.added && !line.removed ? 'text-zinc-400' : ''}
      p-1 font-mono text-sm whitespace-pre-wrap
    `;

    const changeType = line.added ? 'addition' : line.removed ? 'deletion' : 'unchanged';

    return (
      <div 
        className={lineClass}
        role="row"
        aria-label={`Line ${line.lineNumber || index + 1}: ${changeType} - ${line.value}`}
      >
        {showLineNumbers && (
          <span 
            className="inline-block w-12 text-right pr-4 text-zinc-500 select-none"
            role="rowheader"
            aria-label={`Line ${line.lineNumber || index + 1}`}
          >
            {line.lineNumber || index + 1}
          </span>
        )}
        <span role="cell">{line.value}</span>
      </div>
    );
  };

  const sectionType = metadata?.type || 'code section';
  const lineRange = metadata ? `Lines ${metadata.startLine}-${metadata.endLine}` : '';

  return (
    <Card 
      className="relative"
      role="region"
      aria-label={`${sectionType} ${lineRange}`}
      aria-expanded={isExpanded}
    >
      <div className="absolute right-2 top-2 flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleExpanded}
          className="h-8 w-8 p-0"
          aria-label={isExpanded ? 'Collapse section' : 'Expand section'}
          aria-expanded={isExpanded}
          aria-controls={`diff-content-${metadata?.startLine}`}
        >
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" aria-hidden="true" />
          ) : (
            <ChevronDown className="h-4 w-4" aria-hidden="true" />
          )}
        </Button>
      </div>
      
      {metadata && (
        <div 
          className="px-4 py-2 border-b border-border/50 text-sm text-muted-foreground"
          role="heading"
          aria-level={2}
        >
          <span aria-label={`Section range: ${lineRange}`}>
            Lines {metadata.startLine}-{metadata.endLine}
          </span>
          <span aria-label={`Change type: ${metadata.type}`}>
            • {metadata.type}
          </span>
        </div>
      )}

      <div 
        ref={parentRef}
        className={`${isExpanded ? 'h-[400px]' : 'h-[200px]'} overflow-auto`}
        role="table"
        aria-label="Code diff content"
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative'
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => (
            <div
              key={virtualRow.index}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`
              }}
            >
              {renderLine(visibleContent[virtualRow.index], virtualRow.index)}
            </div>
          ))}
        </div>
      </div>

      {!isExpanded && content.length > contextSize * 2 && (
        <div 
          className="p-2 text-center"
          role="complementary"
          aria-live="polite"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={expandContext}
            className="text-xs"
            aria-label="Show more context lines"
          >
            Show more context
          </Button>
        </div>
      )}
    </Card>
  );
};
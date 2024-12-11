import React, { useMemo, useState } from 'react';
import { diffChars, diffWords } from 'diff';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { DiffHighlightMode, DiffChange, DiffViewerProps } from '../types/diff';
import { DiffSection } from './DiffSection';
import { DiffMetadata } from './DiffMetadata';

export const DiffViewer: React.FC<DiffViewerProps> = ({
  oldContent,
  newContent,
  oldMetadata,
  newMetadata
}) => {
  const [diffType, setDiffType] = useState<DiffHighlightMode>('word');
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set());

  const diffs = useMemo(() => {
    try {
      const diffFn = diffType === 'char' ? diffChars : diffWords;
      const result = diffFn(oldContent, newContent);
      return result.map(change => ({
        ...change,
        added: Boolean(change.added),
        removed: Boolean(change.removed)
      })) as DiffChange[];
    } catch (error) {
      console.error('Error computing diff:', error);
      return [];
    }
  }, [oldContent, newContent, diffType]);

  const sections = useMemo(() => {
    let currentSection: DiffChange[] = [];
    const allSections: DiffChange[][] = [];
    let lineNumber = 1;

    diffs.forEach(diff => {
      const lines = diff.value.split('\n');
      lines.forEach((line, index) => {
        const isLastLine = index === lines.length - 1;
        const change: DiffChange = {
          ...diff,
          value: line + (isLastLine ? '' : '\n'),
          lineNumber: lineNumber++
        };

        currentSection.push(change);

        if (currentSection.length >= 50 || (!isLastLine && line === '')) {
          allSections.push(currentSection);
          currentSection = [];
        }
      });
    });

    if (currentSection.length > 0) {
      allSections.push(currentSection);
    }

    return allSections;
  }, [diffs]);

  const toggleSection = (index: number) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const toggleAllSections = (expanded: boolean) => {
    if (expanded) {
      setExpandedSections(new Set(Array.from({ length: sections.length }, (_, i) => i)));
    } else {
      setExpandedSections(new Set());
    }
  };

  return (
    <div 
      className="space-y-4"
      role="main"
      aria-label="Code difference viewer"
    >
      <div 
        className="flex justify-between items-center"
        role="toolbar"
        aria-label="Diff viewer controls"
      >
        <div 
          className="flex gap-2"
          role="radiogroup"
          aria-label="Diff type selection"
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => setDiffType('word')}
            className={diffType === 'word' ? 'bg-primary/20' : ''}
            role="radio"
            aria-checked={diffType === 'word'}
          >
            Word Diff
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setDiffType('char')}
            className={diffType === 'char' ? 'bg-primary/20' : ''}
            role="radio"
            aria-checked={diffType === 'char'}
          >
            Character Diff
          </Button>
        </div>
        
        <div 
          className="flex gap-2"
          role="group"
          aria-label="Section expansion controls"
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => toggleAllSections(true)}
            aria-label="Expand all sections"
          >
            Expand All
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => toggleAllSections(false)}
            aria-label="Collapse all sections"
          >
            Collapse All
          </Button>
        </div>
      </div>

      <div 
        className="grid grid-cols-2 gap-4"
        role="presentation"
      >
        <div 
          className="space-y-4"
          role="region"
          aria-label="Previous version"
        >
          <DiffMetadata metadata={oldMetadata || {}} label="Previous Version" />
          <Card className="relative">
            {sections.map((section, index) => (
              <DiffSection
                key={index}
                content={section.filter(d => !d.added)}
                isExpanded={expandedSections.has(index)}
                onToggle={() => toggleSection(index)}
                metadata={{
                  startLine: section[0]?.lineNumber || 0,
                  endLine: section[section.length - 1]?.lineNumber || 0,
                  type: section.some(d => d.removed) ? 'deletion' : 'context'
                }}
              />
            ))}
          </Card>
        </div>

        <div 
          className="space-y-4"
          role="region"
          aria-label="Current version"
        >
          <DiffMetadata metadata={newMetadata || {}} label="Current Version" />
          <Card className="relative">
            {sections.map((section, index) => (
              <DiffSection
                key={index}
                content={section.filter(d => !d.removed)}
                isExpanded={expandedSections.has(index)}
                onToggle={() => toggleSection(index)}
                metadata={{
                  startLine: section[0]?.lineNumber || 0,
                  endLine: section[section.length - 1]?.lineNumber || 0,
                  type: section.some(d => d.added) ? 'addition' : 'context'
                }}
              />
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
};
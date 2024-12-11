import React, { useMemo, useState } from 'react';
import { diffChars, diffWords } from 'diff';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import type { DiffHighlightMode, DiffChange, DiffViewerProps } from '../types/diff';
import { DiffProvider } from '../context/DiffContext';
import { DiffMetadata } from './DiffMetadata';
import { DiffSection } from './DiffSection';

export const DiffViewer: React.FC<DiffViewerProps> = ({
  oldContent,
  newContent,
  oldMetadata,
  newMetadata
}) => {
  const [diffType, setDiffType] = useState<DiffHighlightMode>('word');
  const [currentDiffIndex, setCurrentDiffIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSearchIndex, setCurrentSearchIndex] = useState(0);

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

  const changes = useMemo(() => 
    diffs.filter(d => d.added || d.removed), [diffs]
  );

  const searchResults = useMemo(() => {
    if (!searchQuery) return [];
    
    const results: { lineIndex: number; matchIndex: number; length: number }[] = [];
    diffs.forEach((diff, diffIndex) => {
      let match;
      const regex = new RegExp(searchQuery, 'gi');
      while ((match = regex.exec(diff.value)) !== null) {
        results.push({
          lineIndex: diffIndex,
          matchIndex: match.index,
          length: match[0].length
        });
      }
    });
    return results;
  }, [diffs, searchQuery]);

  const navigateSearch = (direction: 'prev' | 'next') => {
    if (searchResults.length === 0) return;
    
    setCurrentSearchIndex(prev => {
      if (direction === 'next') {
        return prev >= searchResults.length - 1 ? 0 : prev + 1;
      }
      return prev <= 0 ? searchResults.length - 1 : prev - 1;
    });
  };

  const navigateDiff = (direction: 'prev' | 'next') => {
    setCurrentDiffIndex(prev => {
      if (direction === 'prev') {
        return prev > 0 ? prev - 1 : changes.length - 1;
      }
      return prev < changes.length - 1 ? prev + 1 : 0;
    });
  };

  return (
    <DiffProvider>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDiffType('word')}
              className={diffType === 'word' ? 'bg-primary/20' : ''}
            >
              Word Diff
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDiffType('char')}
              className={diffType === 'char' ? 'bg-primary/20' : ''}
            >
              Character Diff
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative flex items-center">
              <Search className="absolute left-2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search in diff..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 h-8"
              />
              {searchResults.length > 0 && (
                <span className="ml-2 text-sm text-muted-foreground">
                  {currentSearchIndex + 1} of {searchResults.length}
                </span>
              )}
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigateSearch('prev')}
                disabled={searchResults.length === 0}
                className="ml-2"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigateSearch('next')}
                disabled={searchResults.length === 0}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Card className="relative">
            <ScrollArea className="h-[400px]">
              <div className="p-4">
                <DiffSection
                  content={diffs.filter(d => !d.added)}
                  searchQuery={searchQuery}
                  currentSearchIndex={currentSearchIndex}
                  searchResults={searchResults}
                />
              </div>
            </ScrollArea>
          </Card>

          <Card className="relative">
            <ScrollArea className="h-[400px]">
              <div className="p-4">
                <DiffSection
                  content={diffs.filter(d => !d.removed)}
                  searchQuery={searchQuery}
                  currentSearchIndex={currentSearchIndex}
                  searchResults={searchResults}
                />
              </div>
            </ScrollArea>
          </Card>
        </div>
      </div>
    </DiffProvider>
  );
};
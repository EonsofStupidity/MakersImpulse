import type { RevisionRecord } from './base';

export interface RevisionHistoryProps {
  contentId: string;
  onRestore?: (revision: RevisionRecord) => void;
  onPreview?: (revision: RevisionRecord) => void;
}

export interface RevisionItemProps {
  revision: RevisionRecord;
  isSelected: boolean;
  onSelect: (revision: RevisionRecord) => void;
  onRestore?: (revision: RevisionRecord) => void;
  onPreview?: (revision: RevisionRecord) => void;
}

export interface RevisionTimelineProps {
  revisions: RevisionRecord[];
  selectedVersion?: number;
  onVersionSelect: (version: number) => void;
}
import type { RevisionRecord } from './base';

export interface RevisionHistoryState {
  selectedRevision?: RevisionRecord;
  isLoading: boolean;
  error?: string;
  revisions: RevisionRecord[];
}
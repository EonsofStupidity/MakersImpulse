import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { History, ArrowLeft } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Revision {
  id: string;
  version_number?: number;
  content: any;
  created_at: string;
  created_by?: string;
  metadata?: Record<string, any>;
  changes?: any;
}

interface RevisionHistoryProps {
  revisions: Revision[];
  onRestoreRevision?: (revision: Revision) => void;
  onClose?: () => void;
  className?: string;
  showVersionNumbers?: boolean;
  compareMode?: boolean;
  onCompare?: (revisions: Revision[]) => void;
}

export function RevisionHistory({ 
  revisions, 
  onRestoreRevision, 
  onClose,
  className = '',
  showVersionNumbers = false,
  compareMode = false,
  onCompare
}: RevisionHistoryProps) {
  const [selectedRevisions, setSelectedRevisions] = useState<string[]>([]);

  const handleRevisionSelect = (revisionId: string) => {
    if (compareMode) {
      if (selectedRevisions.includes(revisionId)) {
        setSelectedRevisions(selectedRevisions.filter(id => id !== revisionId));
      } else if (selectedRevisions.length < 2) {
        setSelectedRevisions([...selectedRevisions, revisionId]);
      }
    }
  };

  const handleCompare = () => {
    if (onCompare && selectedRevisions.length === 2) {
      const selectedRevisionObjects = revisions.filter(rev => 
        selectedRevisions.includes(rev.id)
      );
      onCompare(selectedRevisionObjects);
    }
  };

  return (
    <Card className={`p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4" />
          <h3 className="font-semibold">Revision History</h3>
        </div>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        )}
      </div>
      
      <ScrollArea className="h-[300px] pr-4">
        <div className="space-y-4">
          {revisions.map((revision, index) => (
            <div
              key={revision.id}
              className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                selectedRevisions.includes(revision.id)
                  ? 'bg-primary/10 border-primary'
                  : 'hover:bg-accent/50 border-border'
              }`}
              onClick={() => handleRevisionSelect(revision.id)}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-medium">
                  {showVersionNumbers 
                    ? `Version ${revision.version_number || revisions.length - index}`
                    : formatDistanceToNow(new Date(revision.created_at), { addSuffix: true })
                  }
                </span>
                {revision.created_by && (
                  <span className="text-xs text-muted-foreground">
                    by {revision.created_by}
                  </span>
                )}
              </div>
              
              {revision.changes && (
                <div className="text-sm text-muted-foreground mt-2">
                  <pre className="whitespace-pre-wrap text-xs">
                    {JSON.stringify(revision.changes, null, 2)}
                  </pre>
                </div>
              )}
              
              {onRestoreRevision && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRestoreRevision(revision);
                  }}
                  className="w-full mt-2"
                >
                  Restore this version
                </Button>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      {compareMode && selectedRevisions.length === 2 && (
        <Button 
          onClick={handleCompare}
          className="w-full mt-4"
        >
          Compare Selected Versions
        </Button>
      )}
    </Card>
  );
}

export default RevisionHistory;
import { useState, useEffect } from 'react';
import { Check, Loader2 } from 'lucide-react';

interface AutosaveIndicatorProps {
  saving: boolean;
  lastSaved?: Date;
}

export const AutosaveIndicator = ({ saving, lastSaved }: AutosaveIndicatorProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (saving) {
      setShow(true);
    } else {
      const timer = setTimeout(() => setShow(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [saving]);

  if (!show) return null;

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      {saving ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Saving...
        </>
      ) : (
        <>
          <Check className="h-4 w-4 text-green-500" />
          {lastSaved ? (
            <span>Saved {new Date(lastSaved).toLocaleTimeString()}</span>
          ) : (
            'All changes saved'
          )}
        </>
      )}
    </div>
  );
};
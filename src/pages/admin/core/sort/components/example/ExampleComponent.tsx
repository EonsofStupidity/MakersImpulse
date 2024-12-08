import React from 'react';
import { withRevisionTracking } from '@/components/common/withRevisionTracking';

interface ExampleComponentProps {
  onTrackChanges?: (entityId: string, changes: Record<string, any>, type: 'create' | 'update' | 'delete') => Promise<void>;
}

const ExampleComponent: React.FC<ExampleComponentProps> = ({ onTrackChanges }) => {
  const handleAction = async () => {
    if (onTrackChanges) {
      await onTrackChanges('example-id', { field: 'value' }, 'update');
    }
  };

  return (
    <div>
      <h1>Example Component</h1>
      <button onClick={handleAction}>Track Change</button>
    </div>
  );
};

export default withRevisionTracking('example', ExampleComponent);
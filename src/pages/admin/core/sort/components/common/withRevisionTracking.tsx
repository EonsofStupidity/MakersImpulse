import { useCallback } from "react";
import { trackRevision } from "@/utils/revisionHistory";

export function withRevisionTracking<T extends object>(
  entityType: string,
  Component: React.ComponentType<T>
) {
  return function WrappedComponent(props: T) {
    const trackChanges = useCallback(async (
      entityId: string,
      changes: Record<string, any>,
      type: 'create' | 'update' | 'delete'
    ) => {
      await trackRevision(entityType, entityId, changes, type);
    }, []);

    return <Component {...props} onTrackChanges={trackChanges} />;
  };
}
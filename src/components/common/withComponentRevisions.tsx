import { ComponentType } from "react";
import { trackComponentRevision } from "@/utils/revisionTracking";
import type { RevisionType } from "@/utils/revisionTracking";

export interface WithRevisionsProps {
  onTrackRevision?: (
    componentId: string, 
    changes: Record<string, any>, 
    type: RevisionType
  ) => Promise<void>;
}

export function withComponentRevisions<T extends WithRevisionsProps>(
  componentType: string,
  Component: ComponentType<T>
) {
  return function WrappedComponent(props: Omit<T, keyof WithRevisionsProps>) {
    const handleRevision = async (
      componentId: string,
      changes: Record<string, any>,
      type: RevisionType
    ) => {
      await trackComponentRevision(componentType, componentId, changes, type);
    };

    return <Component {...(props as T)} onTrackRevision={handleRevision} />;
  };
}
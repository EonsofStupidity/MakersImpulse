import { useCallback } from 'react';
import { Edge, Connection } from 'reactflow';
import { useToast } from "@/components/ui/use-toast";

export const useRelationshipLogic = (edges: Edge[]) => {
  const { toast } = useToast();

  const checkCircularRelationship = useCallback((currentEdges: Edge[], newConnection: Connection) => {
    const visited = new Set<string>();
    const stack = new Set<string>();

    const dfs = (node: string): boolean => {
      if (stack.has(node)) return true;
      if (visited.has(node)) return false;

      visited.add(node);
      stack.add(node);

      const connections = [
        ...currentEdges.map(edge => ({
          source: edge.source as string,
          target: edge.target as string
        })),
        newConnection
      ];

      for (const edge of connections) {
        if (edge.source === node) {
          if (dfs(edge.target)) return true;
        }
      }

      stack.delete(node);
      return false;
    };

    return dfs(newConnection.source as string);
  }, []);

  return {
    checkCircularRelationship
  };
};
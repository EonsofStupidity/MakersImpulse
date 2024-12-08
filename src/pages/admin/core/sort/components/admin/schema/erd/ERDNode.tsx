import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, Key } from "lucide-react";
import { motion } from "framer-motion";

interface ERDNodeProps {
  data: {
    tableName: string;
    columns: Array<{
      name: string;
      type: string;
      isPrimaryKey?: boolean;
      isForeignKey?: boolean;
    }>;
  };
}

export const ERDNode = memo(({ data }: ERDNodeProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="min-w-[200px] shadow-lg">
        <div className="bg-primary/10 p-2 flex items-center gap-2 border-b">
          <Database className="w-4 h-4" />
          <span className="font-bold">{data.tableName}</span>
        </div>
        <div className="p-2 space-y-1">
          {data.columns.map((column, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                {column.isPrimaryKey && <Key className="w-3 h-3 text-primary" />}
                <span>{column.name}</span>
              </div>
              <Badge variant="outline" className="text-xs">
                {column.type}
              </Badge>
            </div>
          ))}
        </div>
        <Handle type="target" position={Position.Left} className="!bg-primary" />
        <Handle type="source" position={Position.Right} className="!bg-primary" />
      </Card>
    </motion.div>
  );
});

ERDNode.displayName = 'ERDNode';
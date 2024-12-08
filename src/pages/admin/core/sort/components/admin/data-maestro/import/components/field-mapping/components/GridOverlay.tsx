import { motion } from "framer-motion";

interface GridOverlayProps {
  columns: number;
  cellSize: number;
  gap: number;
  isDraggingOver: boolean;
}

export const GridOverlay = ({ columns, cellSize, gap, isDraggingOver }: GridOverlayProps) => {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: isDraggingOver ? 0.1 : 0,
        transition: { duration: 0.2 }
      }}
    >
      <div 
        className="grid h-full"
        style={{ 
          gridTemplateColumns: `repeat(${columns}, ${cellSize}px)`,
          gap: `${gap}px`
        }}
      >
        {Array.from({ length: columns }).map((_, i) => (
          <div 
            key={i}
            className="border-r border-primary/10 last:border-r-0"
          />
        ))}
      </div>
    </motion.div>
  );
};
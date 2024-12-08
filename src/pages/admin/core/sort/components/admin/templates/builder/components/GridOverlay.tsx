import { motion } from "framer-motion";

interface GridOverlayProps {
  columns: number;
  cellSize: number;
  gap: number;
  highlightedCell: { row: number; column: number } | null;
}

export const GridOverlay = ({ columns, cellSize, gap, highlightedCell }: GridOverlayProps) => {
  const gridTemplateColumns = `repeat(${columns}, 1fr)`;
  
  return (
    <div 
      className="absolute inset-0 pointer-events-none"
      style={{
        display: 'grid',
        gridTemplateColumns,
        gap: `${gap}px`,
        padding: `${gap}px`
      }}
    >
      {Array.from({ length: columns * Math.ceil(600 / cellSize) }).map((_, index) => {
        const column = (index % columns) + 1;
        const row = Math.floor(index / columns) + 1;
        const isHighlighted = highlightedCell?.row === row && highlightedCell?.column === column;

        return (
          <motion.div
            key={index}
            className={`border border-dashed ${
              isHighlighted 
                ? 'border-primary bg-primary/10' 
                : 'border-gray-200 dark:border-gray-800'
            }`}
            initial={false}
            animate={{
              opacity: isHighlighted ? 1 : 0.5,
              scale: isHighlighted ? 1.05 : 1
            }}
            transition={{ duration: 0.2 }}
            style={{ height: `${cellSize}px` }}
          />
        );
      })}
    </div>
  );
};
import { motion } from "framer-motion";

interface GridOverlayProps {
  columns: number;
}

const GridOverlay = ({ columns }: GridOverlayProps) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {Array.from({ length: columns }).map((_, i) => (
          <div
            key={i}
            className="border-r border-primary/10 last:border-r-0"
          />
        ))}
      </div>
    </div>
  );
};

export default GridOverlay;
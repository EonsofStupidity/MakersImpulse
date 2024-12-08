interface GridOverlayProps {
  columns: number;
}

export const GridOverlay = ({ columns }: GridOverlayProps) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div 
        className="h-full grid gap-px bg-primary/5"
        style={{ 
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` 
        }}
      >
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
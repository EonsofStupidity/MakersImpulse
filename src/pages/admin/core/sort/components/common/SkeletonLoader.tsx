import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  count?: number;
}

const SkeletonLoader = ({ className, count = 1 }: SkeletonProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "animate-pulse rounded-md bg-muted",
            className
          )}
        />
      ))}
    </>
  );
};

export default SkeletonLoader;
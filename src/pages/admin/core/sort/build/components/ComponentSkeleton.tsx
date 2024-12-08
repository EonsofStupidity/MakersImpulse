import { Skeleton } from "@/components/ui/skeleton";

interface ComponentSkeletonProps {
  count?: number;
}

export const ComponentSkeleton = ({ count = 3 }: ComponentSkeletonProps) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton key={index} className="h-24 w-full" />
      ))}
    </div>
  );
};
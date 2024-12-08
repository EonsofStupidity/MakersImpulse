import { Skeleton } from '@/components/ui/skeleton';

interface SkeletonLoaderProps {
  count?: number;
  height?: number;
  className?: string;
}

const SkeletonLoader = ({ count = 1, height = 20, className = '' }: SkeletonLoaderProps) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton
          key={index}
          className={`w-full ${className}`}
          style={{ height: `${height}px` }}
        />
      ))}
    </div>
  );
};

export default SkeletonLoader;
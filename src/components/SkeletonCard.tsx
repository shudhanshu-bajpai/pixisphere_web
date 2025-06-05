
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const SkeletonCard = () => {
  return (
    <Card className="glass-card overflow-hidden">
      <Skeleton className="h-48 w-full" />
      <div className="p-4 space-y-3">
        <div>
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2 mt-1" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-20" />
        </div>
        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-24" />
        </div>
        <Skeleton className="h-8 w-full" />
      </div>
    </Card>
  );
};

interface SkeletonCardProps {
  variant?: 'metric' | 'account' | 'payout' | 'default';
  className?: string;
}

export default function SkeletonCard({ variant = 'default', className = '' }: SkeletonCardProps) {
  const renderMetricSkeleton = () => (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="h-4 w-24 skeleton-shimmer rounded" />
        <div className="h-8 w-8 skeleton-shimmer rounded-full" />
      </div>
      <div className="h-8 w-20 skeleton-shimmer rounded" />
      <div className="h-4 w-32 skeleton-shimmer rounded" />
    </div>
  );

  const renderAccountSkeleton = () => (
    <div className="space-y-4">
      <div className="h-6 w-32 skeleton-shimmer rounded" />
      <div className="space-y-2">
        <div className="h-4 w-full skeleton-shimmer rounded" />
        <div className="h-4 w-3/4 skeleton-shimmer rounded" />
      </div>
      <div className="flex gap-2">
        <div className="h-8 w-20 skeleton-shimmer rounded" />
        <div className="h-8 w-20 skeleton-shimmer rounded" />
      </div>
    </div>
  );

  const renderPayoutSkeleton = () => (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="h-5 w-28 skeleton-shimmer rounded" />
        <div className="h-5 w-16 skeleton-shimmer rounded" />
      </div>
      <div className="h-4 w-full skeleton-shimmer rounded" />
      <div className="h-4 w-2/3 skeleton-shimmer rounded" />
    </div>
  );

  const renderDefaultSkeleton = () => (
    <div className="space-y-3">
      <div className="h-6 w-3/4 skeleton-shimmer rounded" />
      <div className="h-4 w-full skeleton-shimmer rounded" />
      <div className="h-4 w-5/6 skeleton-shimmer rounded" />
    </div>
  );

  const renderContent = () => {
    switch (variant) {
      case 'metric':
        return renderMetricSkeleton();
      case 'account':
        return renderAccountSkeleton();
      case 'payout':
        return renderPayoutSkeleton();
      default:
        return renderDefaultSkeleton();
    }
  };

  return (
    <div className={`p-6 bg-card border border-border rounded-xl animate-slide-up ${className}`}>
      {renderContent()}
    </div>
  );
}

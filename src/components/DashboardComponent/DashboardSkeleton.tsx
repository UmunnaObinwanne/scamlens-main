export const DashboardSkeleton = () => (
  <div className="container mx-auto p-6 animate-pulse">
    {/* Header Skeleton */}
    <div className="flex justify-between items-center mb-6">
      <div className="h-8 w-64 bg-gray-200 rounded" />
      <div className="flex gap-4">
        <div className="h-10 w-48 bg-gray-200 rounded" />
        <div className="h-10 w-44 bg-gray-200 rounded" />
      </div>
    </div>

    {/* Stats Card Skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div className="bg-white rounded-lg p-6 shadow">
        <div className="flex justify-between items-center mb-4">
          <div className="h-4 w-24 bg-gray-200 rounded" />
          <div className="h-4 w-4 bg-gray-200 rounded" />
        </div>
        <div className="h-8 w-16 bg-gray-200 rounded mb-2" />
        <div className="h-3 w-32 bg-gray-200 rounded" />
      </div>
    </div>

    {/* Tabs Skeleton */}
    <div className="w-full mb-4">
      <div className="flex gap-2 mb-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-10 w-28 bg-gray-200 rounded" />
        ))}
      </div>
    </div>

    {/* Report Cards Grid Skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg p-6 shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="space-y-2">
              <div className="h-5 w-40 bg-gray-200 rounded" />
              <div className="h-4 w-32 bg-gray-200 rounded" />
            </div>
            <div className="h-6 w-24 bg-gray-200 rounded" />
          </div>
          <div className="flex justify-between items-center">
            <div className="h-4 w-28 bg-gray-200 rounded" />
            <div className="h-6 w-20 bg-gray-200 rounded" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

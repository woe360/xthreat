import { Skeleton } from "@/components/skeleton"

export const ModuleSkeleton = () => {
  return (
    <main className="bg-[#050607] font-sans text-gray-100 min-h-screen w-full">
      {/* Skeleton for TimeTrackingDashboard */}
      <div className="max-w-[1400px] mx-auto py-5 px-6">
        {/* Top bar skeleton */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-3">
            <Skeleton className="h-6 w-40 bg-gray-800/40 rounded-full" />
            <Skeleton className="h-6 w-44 bg-gray-800/40 rounded-full" />
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-8 bg-gray-800/40 rounded-full" />
            <Skeleton className="h-5 w-48 bg-gray-800/40 rounded" />
            <Skeleton className="h-8 w-8 bg-gray-800/40 rounded-full" />
          </div>
        </div>

        {/* Grid skeleton */}
        <div className="flex gap-4">
          {/* Weekday labels skeleton */}
          <div className="flex flex-col">
            <Skeleton className="h-6 w-8 mb-1 bg-transparent" /> {/* Spacer */}
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-6 mb-7 w-8 bg-gray-800/40 rounded" />
            ))}
          </div>

          {/* Month labels + dots grid skeleton */}
          <div className="relative overflow-x-auto flex-grow">
            {/* Month labels row skeleton */}
            <div className="flex h-6 items-center mb-1 gap-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-4 w-24 bg-gray-800/40 rounded" />
              ))}
            </div>
            {/* Dots grid skeleton */}
            <div className="grid grid-rows-5 grid-flow-col auto-cols-[14px] gap-7">
              {[...Array(5 * 22)].map((_, i) => ( // Approximate 5 rows * ~22 columns
                <Skeleton key={i} className="w-3.5 h-3.5 bg-gray-800/40 rounded-full" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Tags & Search Section */}
      <div className="sticky top-0 bg-[#050607]/80 backdrop-blur-md z-10 border-b border-white/15 py-4 px-4">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Tag Skeletons */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton 
                  key={i}
                  className="h-8 w-24 bg-[#0a0a0a] border border-white/15 rounded-full flex-shrink-0"
                />
              ))}
            </div>
            {/* Search Skeleton */}
            <div className="relative w-full md:w-80">
              <Skeleton className="h-9 w-full bg-[#0a0a0a] border border-white/15 rounded-full pl-9" />
            </div>
          </div>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="max-w-[1400px] mx-auto py-8 px-8"> 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> 
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-auto">
              <div className="bg-black/20 border border-white/15 rounded-md p-6 h-full">
                <div className="flex flex-col h-full">
                  <Skeleton className="h-6 w-3/4 bg-gray-800/40 mb-3" />
                  <div className="space-y-2 mb-4 flex-grow">
                    <Skeleton className="h-4 bg-gray-800/40" />
                    <Skeleton className="h-4 w-5/6 bg-gray-800/40" />
                  </div>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    <Skeleton className="h-6 w-16 bg-gray-800/40 rounded-full" />
                    <Skeleton className="h-6 w-20 bg-gray-800/40 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default ModuleSkeleton
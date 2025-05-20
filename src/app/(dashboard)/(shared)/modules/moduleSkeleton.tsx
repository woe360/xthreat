import { Skeleton } from "@/components/skeleton"

export const ModuleSkeleton = () => {
  return (
    <main className="bg-[#0b0b0b] font-sans text-gray-100 min-h-screen w-full">
      {/* Header Section */}
      <div className="max-w-[1650px] mx-auto pb-2 px-10">
        <div className="pt-8">
          <Skeleton className="h-10 w-60 bg-gray-800/40 mb-4 rounded" />
          <Skeleton className="h-5 w-96 bg-gray-800/40 rounded mb-5" />
        </div>
      </div>

      {/* Sticky Tags & Search Section */}
      <div className="sticky top-0 bg-[#0b0b0b]/80 backdrop-blur-md z-10 border-b border-white/10 py-4 px-4">
        <div className="max-w-[1620px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Tag Skeletons */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton 
                  key={i}
                  className="h-8 w-24 bg-[#121212] border border-white/10 rounded-full flex-shrink-0"
                />
              ))}
            </div>
            {/* Search Skeleton */}
            <div className="relative w-full md:w-80">
              <Skeleton className="h-9 w-full bg-[#121212] border border-white/10 rounded-full pl-9" />
            </div>
          </div>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="max-w-[1650px] mx-auto py-8 px-10"> 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> 
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="h-auto">
              <div className="bg-[#121212] border border-white/10 rounded-md p-6 h-full">
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
import { Skeleton } from "@/components/skeleton"

export const ModuleSkeleton = () => {
  return (
    <main className="bg-[#050607] font-sans text-gray-100 min-h-screen w-full">
      {/* Header Section */}
      <div className="px-10 w-full">
        <div className="border-b border-gray-800/40">
          <div className="py-4">
            <Skeleton className="h-8 w-32 bg-[#181b24] mb-4 mt-3" />
            <div className="w-3/5 space-y-2 mb-8">
              <Skeleton className="h-4 bg-[#181b24]" />
              <Skeleton className="h-4 bg-[#181b24]" />
              <Skeleton className="h-4 w-2/3 bg-[#181b24]" />
            </div>
          </div>
        </div>
      </div>

      {/* Tags Section */}
      <div className="sticky top-0 bg-[#050607] z-[50] w-full">
        <div className="border-b border-gray-800/40 shadow-lg px-10">
          <div className="py-4">
            <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton 
                  key={i}
                  className="h-8 w-24 bg-[#181b24] rounded-lg flex-shrink-0"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="px-10 pt-4 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-[220px]">
              <div className="bg-[#181b24] border border-gray-800/40 rounded-lg p-6 h-full">
                <div className="flex flex-col h-full">
                  <Skeleton className="h-7 w-3/4 bg-gray-800/30 mb-2" />
                  <div className="space-y-2 mb-4 flex-grow">
                    <Skeleton className="h-4 bg-gray-800/30" />
                    <Skeleton className="h-4 w-2/3 bg-gray-800/30" />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Skeleton className="h-6 w-20 bg-gray-800/30" />
                    <Skeleton className="h-6 w-20 bg-gray-800/30" />
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
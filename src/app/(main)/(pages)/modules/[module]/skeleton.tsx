import { Skeleton } from "@/components/ui/skeleton"

export const ModuleSkeleton = () => {
  return (
    <div className="min-h-screen font-sans bg-[#050607] text-gray-100 p-4 px-10 mt-3">
      {/* Header Section */}
      <div className="border-b border-gray-800/40 pb-6 mb-8">
        {/* Title Area */}
        <div className="flex items-center gap-3 mb-6">
          <Skeleton className="w-8 h-8 rounded-lg" /> {/* Back button */}
          <Skeleton className="h-8 w-64" /> {/* Title */}
        </div>
        
        {/* Tags */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-wrap gap-3">
            <Skeleton className="h-7 w-20 rounded-lg" />
            <Skeleton className="h-7 w-20 rounded-lg" />
            <Skeleton className="h-7 w-20 rounded-lg" />
            <Skeleton className="h-7 w-24 rounded-lg" />
          </div>
        </div>

        {/* Description */}
        <div className="mb-0">
          <Skeleton className="h-4 w-full max-w-2xl mb-2" />
          <Skeleton className="h-4 w-3/4 max-w-2xl" />
        </div>
      </div>

      {/* Lessons Grid */}
      <div className="grid gap-2">
        {[1, 2, 3, 4, 5].map((index) => (
          <div 
            key={index}
            className="bg-[#181b24] border border-transparent rounded-lg p-4"
          >
            <div className="flex justify-between items-center">
              <div>
                <Skeleton className="h-5 w-64 mb-1" /> {/* Lesson title */}
                <Skeleton className="h-4 w-96" /> {/* Lesson description */}
              </div>
              <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                <Skeleton className="h-7 w-20 rounded-lg" /> {/* Level tag */}
                <Skeleton className="h-7 w-24 rounded-lg" /> {/* Points tag */}
                <Skeleton className="h-7 w-20 rounded-lg" /> {/* Time tag */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ModuleSkeleton
import { Skeleton } from "@/components/skeleton"

export const ModuleSkeleton = () => {
  return (
    <div className="min-h-screen font-sans bg-[#050607] text-gray-100 px-8 py-6">
      <div className="max-w-[1400px] mx-auto">
        {/* Header Section */}
        <div className="border-b border-white/15 pb-6 mb-8">
          {/* Back Button */}
          <Skeleton className="h-9 w-20 mb-6 rounded-full bg-gray-800/40 border border-white/20" />
          
          <div className="flex flex-col md:flex-row justify-between">
            {/* Left Side: Title, Desc, Tags */}
            <div>
              <Skeleton className="h-8 w-3/5 mb-4 bg-gray-800/40" /> {/* Title */}
              <div className="max-w-2xl space-y-2 mb-4"> {/* Description */}
                <Skeleton className="h-4 w-full bg-gray-800/40" />
                <Skeleton className="h-4 w-5/6 bg-gray-800/40" />
              </div>
              {/* Tags */}
              <div className="flex flex-wrap gap-3 mt-4">
                <Skeleton className="h-7 w-28 rounded-full bg-gray-800/40" />
                <Skeleton className="h-7 w-24 rounded-full bg-gray-800/40" />
                <Skeleton className="h-7 w-24 rounded-full bg-gray-800/40" />
              </div>
            </div>

            {/* Right Side: Progress Circle */}
            <div className="flex flex-col items-center mt-4 md:mt-0">
              <Skeleton className="w-24 h-24 rounded-full bg-gray-800/40" />
            </div>
          </div>
        </div>

        {/* Lessons List Section */}
        <div className="space-y-6">
          {[1, 2, 3, 4].map((index) => (
            <div 
              key={index}
              className="border border-white/15 rounded-md overflow-hidden bg-black/20"
            >
              {/* Collapsed Lesson Header Skeleton */}
              <div className="p-5">
                <div className="flex justify-between items-center">
                  {/* Left: Title/Desc */}
                  <div className="flex-grow mr-6">
                    <Skeleton className="h-6 w-1/2 mb-2 bg-gray-800/40" /> {/* Lesson title */}
                    <Skeleton className="h-4 w-full bg-gray-800/40" /> {/* Lesson description */}
                  </div>
                  {/* Right: Tags + Chevron */}
                  <div className="hidden md:flex items-center gap-2 ml-6 flex-shrink-0">
                    <Skeleton className="h-6 w-20 rounded-full bg-gray-800/40" /> {/* Level tag */}
                    <Skeleton className="h-6 w-32 rounded-full bg-gray-800/40" /> {/* Completion tag */}
                    <Skeleton className="h-5 w-5 ml-4 rounded bg-gray-800/40" /> {/* Chevron */}
                  </div>
                   {/* Mobile Chevron Placeholder */}
                   <div className="md:hidden flex-shrink-0 ml-4">
                      <Skeleton className="h-5 w-5 rounded bg-gray-800/40" />
                   </div>
                </div>
                {/* Mobile Tags/Progress Placeholder */}
                <div className="md:hidden mt-3">
                    <div className="flex items-center justify-between mb-1">
                        <div className="flex gap-2">
                            <Skeleton className="h-6 w-20 rounded-full bg-gray-800/40" />
                            <Skeleton className="h-6 w-24 rounded-full bg-gray-800/40" />
                        </div>
                         <Skeleton className="h-4 w-8 rounded bg-gray-800/40" />
                    </div>
                    <Skeleton className="h-1 w-full rounded-full bg-gray-800/40" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ModuleSkeleton
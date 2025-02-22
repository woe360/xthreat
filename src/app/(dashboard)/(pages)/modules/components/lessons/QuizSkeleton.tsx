// import { Skeleton } from "@/components/ui/skeleton"

// export const QuizSkeleton = () => {
//   return (
//     <div className="max-w-3xl mx-auto px-4">
//       <div className="flex justify-center mb-4">
//         <Skeleton className="h-4 w-32" /> {/* Question counter skeleton */}
//       </div>

//       <div className="bg-[#181b24] border border-gray-800/40 rounded-lg overflow-hidden">
//         <div className="h-1 bg-gray-800">
//           <Skeleton className="h-full w-1/4" /> {/* Progress bar skeleton */}
//         </div>

//         <div className="p-6">
//           <div className="mb-8">
//             <Skeleton className="h-7 w-3/4 mb-2" /> {/* Question text skeleton */}
//             <Skeleton className="h-4 w-32" /> {/* "Select all that apply" skeleton */}
//           </div>

//           <div className="space-y-3">
//             {[1, 2, 3, 4].map((i) => (
//               <Skeleton 
//                 key={i} 
//                 className="w-full h-14 rounded-lg" 
//               />
//             ))}
//           </div>
          
//           <div className="flex justify-between mt-8 pt-6 border-t border-gray-800/40">
//             <Skeleton className="h-9 w-24" /> {/* Previous button skeleton */}
//             <Skeleton className="h-9 w-32" /> {/* Next button skeleton */}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default QuizSkeleton

import { Skeleton } from "@/components/skeleton"

export const QuizSkeleton = () => {
  return (
    <div className="min-h-screen flex items-center">
      <div className="max-w-3xl mx-auto px-4 w-full">
        <div className="flex justify-center mb-4">
          <Skeleton className="h-4 w-32" /> {/* Question counter skeleton */}
        </div>

        <div className="bg-[#181b24] border border-gray-800/40 rounded-lg overflow-hidden">
          <div className="h-1 bg-gray-800">
            <Skeleton className="h-full w-1/4" /> {/* Progress bar skeleton */}
          </div>

          <div className="p-6">
            <div className="mb-8">
              <Skeleton className="h-7 w-3/4 mb-2" /> {/* Question text skeleton */}
              <Skeleton className="h-4 w-32" /> {/* "Select all that apply" skeleton */}
            </div>

            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton 
                  key={i} 
                  className="w-full h-14 rounded-lg" 
                />
              ))}
            </div>
            
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-800/40">
              <Skeleton className="h-9 w-24" /> {/* Previous button skeleton */}
              <Skeleton className="h-9 w-32" /> {/* Next button skeleton */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuizSkeleton
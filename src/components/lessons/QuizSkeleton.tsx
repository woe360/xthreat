import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export const QuizSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="mb-4">
        <Skeleton className="h-4 w-32" /> {/* Question counter skeleton */}
      </div>

      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <Skeleton className="h-6 w-3/4" /> {/* Question title skeleton */}
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3, 4].map((i) => ( // Tipinis atsakymų skaičius
            <Skeleton key={i} className="h-14 w-full" /> // Answer buttons skeleton
          ))}
          
          <div className="flex justify-between mt-8">
            <Skeleton className="h-10 w-24" /> {/* Previous button skeleton */}
            <Skeleton className="h-10 w-24" /> {/* Next button skeleton */}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 
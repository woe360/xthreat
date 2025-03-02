import React from 'react'
import { History } from 'lucide-react'
import { cn } from "@/lib/utils"

interface Props {
  selected?: boolean
  className?: string
}

const Sessions = ({ selected, className }: Props) => {
  return (
    <History
      size={20}
      className={cn(
        "transition-colors duration-200",
        selected ? "text-gray-200" : "text-gray-400 group-hover:text-gray-200",
        className
      )}
    />
  )
}

export default Sessions 
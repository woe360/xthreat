export interface Module {
  id: string
  title: string
  description: string
  tags: string[]
  slug: string
  points: number
  status?: string
  difficulty?: string
  topic?: string
  duration?: number
  settings: {
    isPublished: boolean
    isArchived: boolean
    isDeleted: boolean
  }
} 
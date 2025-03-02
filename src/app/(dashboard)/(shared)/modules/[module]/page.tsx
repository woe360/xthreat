'use client'

import { useParams } from 'next/navigation'
import React from 'react'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import ModuleSkeleton from './skeleton'

const ModulePage = () => {
  const params = useParams()
  const [lessons, setLessons] = React.useState<any[]>([])
  const [moduleData, setModuleData] = React.useState<any>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const moduleRes = await fetch(`/api/modules/${params.module}`)
        if (!moduleRes.ok) throw new Error('Failed to fetch module')
        const moduleData = await moduleRes.json()
        setModuleData(moduleData)

        const lessonsRes = await fetch(`/api/modules/${params.module}/lessons`)
        if (!lessonsRes.ok) throw new Error('Failed to fetch lessons')
        const lessonsData = await lessonsRes.json()
        setLessons(lessonsData)
      } catch (err) {
        console.error('Error:', err)
        setError('Failed to load data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [params.module])

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'E':
        return 'bg-green-500/10 text-green-500'
      case 'C':
        return 'bg-orange-500/10 text-orange-500'
      case 'A':
        return 'bg-purple-500/10 text-purple-500'
      default:
        return 'bg-gray-500/10 text-gray-500'
    }
  }

  const getLevelText = (level: string) => {
    switch (level) {
      case 'E':
        return 'Essential'
      case 'C':
        return 'Core'
      case 'A':
        return 'Advanced'
      default:
        return 'Unknown'
    }
  }

  if (loading) {
    return <ModuleSkeleton />
  }

  if (error) {
    return (
      <div className="min-h-screen font-sans bg-[#050607] text-gray-100 p-4 px-6 mt-3">
        <div className="text-red-400">Error: {error}</div>
      </div>
    )
  }

  const totalPoints = lessons.reduce((total, lesson) => total + lesson.points, 0)

  return (
    <div className="min-h-screen font-sans bg-[#050607] text-gray-100 p-4 px-10 mt-3">
      <div className="border-b border-gray-800/40 pb-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Link
            className="text-gray-400 justify-center hover:bg-[#181b24] border border-gray-700 w-8 h-8 rounded-lg hover:text-gray-200 transition-colors flex items-center"
            href="/modules"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-medium text-white">{moduleData?.title}</h1>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-wrap gap-3">
            <span className="bg-green-500/10 text-green-500 px-3 py-1 rounded-lg text-sm">Essential</span>
            <span className="bg-orange-500/10 text-orange-500 px-3 py-1 rounded-lg text-sm">Core</span>
            <span className="bg-purple-500/10 text-purple-500 px-3 py-1 rounded-lg text-sm">Advanced</span>
            <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-lg text-sm">
              {totalPoints} Points
            </span>
          </div>
        </div>
  
        <div className="mb-0">
          <p className="text-gray-400 text-sm max-w-3xl">
            {moduleData?.description}
          </p>
        </div>
      </div>

      <div className="grid gap-2">
        {lessons.map((lesson) => (
          <Link 
            href={`/modules/${params.module}/${lesson.id}`} 
            key={lesson.id}
          >
            <div className="group bg-[#181b24] hover:bg-[#181b24]/80 border border-transparent hover:border-gray-800 rounded-lg cursor-pointer transition-all duration-200">
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-base font-medium text-white mb-1">
                      {lesson.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {lesson.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                    <span className={`${getLevelColor(lesson.level)} px-3 py-1 rounded-lg text-sm`}>
                      {getLevelText(lesson.level)}
                    </span>
                    <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-lg text-sm">
                      {lesson.points} Points
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ModulePage
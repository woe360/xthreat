'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/button'
import { ChevronLeft, Edit, Plus, Trash2 } from 'lucide-react'
import Link from 'next/link'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Module } from '@/types/module'
import { Lesson } from '@/types/lesson'

export default function AdminModulePage() {
  const params = useParams()
  const router = useRouter()
  const [module, setModule] = useState<Module | null>(null)
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        const moduleId = typeof params?.id === 'string' ? params.id : Array.isArray(params?.id) ? params.id[0] : null
        
        if (!moduleId) {
          throw new Error('Module ID is missing')
        }

        const [moduleData, lessonsData] = await Promise.all([
          fetch(`/api/modules/${moduleId}`).then(res => {
            if (!res.ok) throw new Error('Failed to fetch module')
            return res.json()
          }),
          fetch(`/api/modules/${moduleId}/lessons`).then(res => {
            if (!res.ok) throw new Error('Failed to fetch lessons')
            return res.json()
          })
        ])

        setModule(moduleData)
        setLessons(lessonsData)
      } catch (err) {
        console.error('Error fetching data:', err)
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [params])

  if (loading) {
    return (
      <div className="min-h-screen font-sans bg-[#050607] text-gray-100 p-4 px-10 mt-3">
        <div>Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen font-sans bg-[#050607] text-gray-100 p-4 px-10 mt-3">
        <div className="text-red-400">Error: {error}</div>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => router.push('/trainings')}
        >
          Back to Trainings
        </Button>
      </div>
    )
  }

  if (!module) {
    return (
      <div className="min-h-screen font-sans bg-[#050607] text-gray-100 p-4 px-10 mt-3">
        <div>Module not found</div>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => router.push('/trainings')}
        >
          Back to Trainings
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen font-sans bg-[#050607] text-gray-100 p-4 px-10 mt-3">
      <div className="border-b border-gray-800/40 pb-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Link
            className="text-gray-400 justify-center hover:bg-[#181b24] border border-gray-700 w-8 h-8 rounded-lg hover:text-gray-200 transition-colors flex items-center"
            href="/trainings"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-medium text-white">{module.title}</h1>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-wrap gap-3">
            {module.tags.map((tag: string, index: number) => (
              <span key={index} className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-lg text-sm">
                {tag}
              </span>
            ))}
            <span className="bg-purple-500/10 text-purple-400 px-3 py-1 rounded-lg text-sm">
              {module.difficulty}
            </span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-gray-800">
              <Edit className="h-4 w-4 mr-2" />
              Edit Module
            </Button>
          </div>
        </div>
  
        <div className="mb-0">
          <p className="text-gray-400 text-sm max-w-3xl">
            {module.description}
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium">Lessons</h2>
        <Button className="bg-blue-500/30 text-blue-400 hover:bg-blue-500/50 hover:text-blue-200">
          <Plus size={20} className="mr-2" />
          Add Lesson
        </Button>
      </div>

      <div className="bg-[#181b24] rounded-lg border border-gray-800">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Points</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lessons.map((lesson: Lesson) => (
              <TableRow key={lesson.id}>
                <TableCell>{lesson.lesson_order}</TableCell>
                <TableCell>{lesson.title}</TableCell>
                <TableCell>{lesson.description}</TableCell>
                <TableCell>
                  <span className="bg-blue-500/10 text-blue-400 px-2 py-1 rounded text-sm">
                    {lesson.level}
                  </span>
                </TableCell>
                <TableCell>{lesson.points}</TableCell>
                <TableCell>{lesson.estimated_time} min</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => router.push(`/trainings/modules/${params.id}/lessons/${lesson.id}/edit`)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="hover:text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
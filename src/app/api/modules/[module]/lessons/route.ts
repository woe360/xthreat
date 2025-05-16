// src/app/api/modules/[module]/lessons/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export async function GET(
  request: Request,
  { params }: { params: { module: string } }
) {
  // Check if params exists before accessing its properties
  if (!params || typeof params.module !== 'string') {
    return NextResponse.json({ error: 'Invalid module parameter' }, { status: 400 })
  }
  const moduleSlug = params.module
  
  if (!moduleSlug) {
    return NextResponse.json(
      { error: 'Module slug is required' },
      { status: 400 }
    )
  }

  const cookieStore = cookies()
  // Use authenticated client
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

  try {
    // 1. Check session authentication
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()

    if (sessionError || !session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 2. Find the module ID using the authenticated client
    // Note: RLS on 'modules' table will apply here
    const { data: moduleData, error: moduleError } = await supabase
      .from('modules')
      .select('id')
      .ilike('slug', moduleSlug) // Use case-insensitive match
      .maybeSingle() // Use maybeSingle to handle no match gracefully

    if (moduleError) {
      console.error('Error fetching module ID:', moduleError)
      return NextResponse.json({ error: 'Failed to verify module' }, { status: 500 })
    }

    if (!moduleData) {
      // Module not found or user doesn't have RLS access to it
      return NextResponse.json({ error: 'Module not found' }, { status: 404 })
    }

    const moduleId = moduleData.id

    // 3. Fetch lessons for the module using the authenticated client
    // Note: RLS on 'lessons' table will apply here
    const { data: lessonsData, error: lessonsError } = await supabase
      .from('lessons')
      .select('*')
      .eq('module_id', moduleId)
      .order('lesson_order', { ascending: true })

    if (lessonsError) {
      console.error('Error fetching lessons:', lessonsError)
      return NextResponse.json({ error: 'Failed to fetch lessons' }, { status: 500 })
    }

    if (!lessonsData || lessonsData.length === 0) {
      // No lessons found or user lacks RLS access
      return NextResponse.json([]) // Return empty array
    }

    // 4. Fetch sub-lessons for these lessons using the authenticated client
    // Note: RLS on 'sub_lessons' table will apply here
    const lessonIds = lessonsData.map(l => l.id)
    const { data: subLessonsData, error: subLessonsError } = await supabase
      .from('sub_lessons')
      .select('id, title, slug, lesson_id, order_number')
      .in('lesson_id', lessonIds)
      .order('order_number', { ascending: true })

    if (subLessonsError) {
      console.error('Error fetching sub-lessons:', subLessonsError)
      // Proceed without sub-lessons if there's an error, return lessons only
       return NextResponse.json(lessonsData.map(lesson => ({ ...lesson, subLessons: [] })))
    }

    // 5. Attach sub-lessons and return
    const lessonsWithSubLessons = lessonsData.map(lesson => ({
      ...lesson,
      subLessons: subLessonsData?.filter(sub => sub.lesson_id === lesson.id) || []
    }))

    return NextResponse.json(lessonsWithSubLessons)

  } catch (error) {
    console.error('Error in lessons API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
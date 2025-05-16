import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export async function GET(
  request: Request,
  { params }: { params: { module: string; lesson: string; sublesson: string } }
) {
  try {
    // Ensure params are valid
    if (!params || !params.module || !params.lesson || !params.sublesson) {
      return NextResponse.json({ error: 'Missing module, lesson, or sub-lesson slug' }, { status: 400 })
    }
    const moduleSlug = params.module
    const lessonSlug = params.lesson
    const subLessonSlug = params.sublesson
    
    const cookieStore = cookies()
    // Use authenticated client
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    // 1. Check session authentication
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()

    if (sessionError || !session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 2. Query for the sub-lesson using authenticated client
    // RLS will apply to modules, lessons, and sub_lessons tables
    const { data: subLessonData, error: subLessonError } = await supabase
      .from('sub_lessons')
      .select(`
        *,
        lesson:lessons!inner (
          module:modules!inner (*)
        )
      `)
      .eq('slug', subLessonSlug)
      .eq('lesson.slug', lessonSlug)
      .eq('lesson.module.slug', moduleSlug)
      .maybeSingle() // Use maybeSingle for potentially 0 rows due to RLS

    if (subLessonError) {
      console.error('Error fetching sub-lesson:', subLessonError)
      // Avoid leaking detailed errors
      return NextResponse.json({ error: 'Failed to fetch sub-lesson data' }, { status: 500 })
    }

    if (!subLessonData) {
      // Not found or RLS restricted access
      return NextResponse.json({ error: 'Sub-lesson not found' }, { status: 404 })
    }

    // Extract only the core sub_lesson fields if desired
    const { lesson, ...coreSubLessonData } = subLessonData

    return NextResponse.json(coreSubLessonData)

  } catch (error) {
    console.error('Error in sub-lesson API route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 
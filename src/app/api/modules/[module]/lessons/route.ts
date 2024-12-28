// src/app/api/modules/[module]/lessons/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(
  req: Request,
  { params }: { params: { module: string } }
) {
  const cookieStore = await cookies()
  const moduleSlug = params.module

  try {
    const supabase = createRouteHandlerClient({
      cookies: () => cookieStore,
    })

    // Pirma gauname modulio ID pagal slug
    const { data: moduleData, error: moduleError } = await supabase
      .from('modules')
      .select('id')
      .eq('slug', moduleSlug)
      .single()

    if (moduleError) {
      return NextResponse.json({ error: 'Module not found' }, { status: 404 })
    }

    // Tada gauname pamokas pagal modulio ID
    const { data: lessonsData, error: lessonsError } = await supabase
      .from('lessons')
      .select(`
        id,
        title,
        description,
        module_id,
        points,
        lesson_order,
        estimated_time,
        level
      `)
      .eq('module_id', moduleData.id)
      .order('lesson_order', { ascending: true })

    if (lessonsError) {
      return NextResponse.json({ error: 'Failed to fetch lessons' }, { status: 500 })
    }

    return NextResponse.json(lessonsData)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
// src/app/api/modules/[module]/route.ts
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

    const { data, error } = await supabase
      .from('modules')
      .select('*')
      .eq('slug', moduleSlug)
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Failed to fetch module' }, { status: 500 })
  }
}
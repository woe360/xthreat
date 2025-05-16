// src/app/api/modules/[module]/route.ts
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

    // HACK Check: Remove this block if you want DB lookup for phishing-awareness
    if (moduleSlug.toLowerCase() === 'phishing-awareness') {
      // console.log('Using hardcoded data for phishing-awareness') // Removed log
      return NextResponse.json({
        id: 1,
        slug: 'phishing-awareness',
        title: 'Phishing Awareness',
        description: 'Learn to recognize and respond to phishing attempts',
        tags: ['Threats']
      })
    }
    // End of HACK Check

    // 2. Fetch the specific module using the authenticated client
    // RLS on 'modules' table will apply
    const { data, error } = await supabase
      .from('modules')
      .select('*') // Select all columns or specific ones needed
      .ilike('slug', moduleSlug) // Case-insensitive match
      .maybeSingle() // Handles 0 or 1 result gracefully

    if (error) {
      console.error('Error fetching module:', error)
      return NextResponse.json({ error: 'Failed to fetch module data' }, { status: 500 })
    }

    if (!data) {
      // Module not found by slug, or RLS prevents access
      // Optionally, try fetching by ID if slug might be numeric
      if (!isNaN(Number(moduleSlug))) {
        const moduleId = parseInt(moduleSlug)
        const { data: idData, error: idError } = await supabase
          .from('modules')
          .select('*')
          .eq('id', moduleId)
          .maybeSingle()
        
        if (idError) {
          console.error('Error fetching module by ID:', idError)
          // Fall through to 404 if ID lookup also fails
        } else if (idData) {
          // Found by ID
          return NextResponse.json(idData)
        }
      }
      // If not found by slug or ID, return 404
      return NextResponse.json({ error: 'Module not found' }, { status: 404 })
    }

    // 3. Return the module data
    return NextResponse.json(data)

  } catch (error) {
    console.error('Error in module API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
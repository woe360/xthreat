import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const cookieStore = await cookies()
  // Create a client authenticated as the user making the request
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

  try {
    // 1. Check if the user is authenticated
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()

    if (sessionError || !session) {
      // Deny access if user is not logged in
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 2. Authorization Check (Optional - Example: Allow any logged-in user)
    // If you needed specific roles, you would fetch the user's role here
    // and add checks like: if (userRole !== 'admin' && userRole !== 'manager') ...

    // 3. Fetch modules using the authenticated client
    // The user's authentication context is automatically applied.
    // RLS policies will filter the data based on this user.
    const { data, error } = await supabase
      .from('modules')
      .select('*')

    if (error) {
      console.error('Error fetching modules:', error)
      return NextResponse.json(
        { error: `Failed to fetch modules` }, // Avoid leaking detailed error messages
        { status: 500 }
      )
    }

    console.log(`User ${session.user.email} fetched ${data?.length || 0} modules`)

    // 4. Return the data (potentially filtered by RLS)
    return NextResponse.json(data || [])

  } catch (error) {
    console.error('Error in modules API GET handler:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Removed the unused getHardcodedModules function 
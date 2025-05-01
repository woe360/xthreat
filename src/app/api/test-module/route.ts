import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    console.log('Testing direct fetch of phishing-awareness module')
    
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    
    // First try with the exact slug
    const { data: slugData, error: slugError } = await supabase
      .from('modules')
      .select('*')
      .eq('slug', 'phishing-awareness')
      .single()
    
    console.log('Slug query results:', {
      data: slugData?.length || 0,
      error: slugError ? true : false
    })
    
    if (slugError) {
      console.error('Error fetching by slug:', slugError)
    }
    
    // Then check all available modules in the database
    const { data: allModules, error: listError } = await supabase
      .from('modules')
      .select('id, slug, title')
    
    if (listError) {
      console.error('Error fetching all modules:', listError)
      return NextResponse.json(
        { error: 'Failed to test modules' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({
      phishingModuleBySlug: slugData,
      allModules: allModules,
      message: "This endpoint tests direct database access to the 'phishing-awareness' module"
    })
  } catch (error) {
    console.error('Error in test-module API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 
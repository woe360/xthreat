import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  console.log('🚀 Analytics API route called!')
  
  try {
    const analyticsEvent = await request.json()
    console.log('🔍 API received analytics event:', analyticsEvent)
    console.log('🔍 Event will be inserted into table: analytics_events')
    
    const cookieStore = await cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    console.log('🔍 Supabase client created')
    
    // Store in Supabase analytics_events table
    console.log('🔍 Attempting database insert...')
    const { data, error } = await supabase
      .from('analytics_events')
      .insert([analyticsEvent])
    
    if (error) {
      console.error('❌ Database error:', error)
      console.error('❌ Error details:', JSON.stringify(error, null, 2))
      console.error('❌ Error code:', error.code)
      console.error('❌ Error message:', error.message)
      return NextResponse.json({ error: 'Failed to store analytics event', details: error }, { status: 500 })
    }
    
    console.log('✅ Database insert successful!')
    console.log('✅ Inserted data:', data)
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('❌ Analytics API error:', error)
    console.error('❌ Error stack:', error instanceof Error ? error.stack : 'No stack trace')
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const eventType = searchParams.get('event_type')
    const userId = searchParams.get('user_id')
    const moduleId = searchParams.get('module_id')
    const startDate = searchParams.get('start_date')
    const endDate = searchParams.get('end_date')
    
    const cookieStore = await cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    let query = supabase.from('analytics_events').select('*')
    
    // Apply filters
    if (eventType) query = query.eq('event_type', eventType)
    if (userId) query = query.eq('user_id', userId)
    if (moduleId) query = query.eq('module_id', moduleId)
    if (startDate) query = query.gte('timestamp', startDate)
    if (endDate) query = query.lte('timestamp', endDate)
    
    const { data, error } = await query.order('timestamp', { ascending: false })
    
    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 })
    }
    
    return NextResponse.json({ data })
  } catch (error) {
    console.error('Analytics GET API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 
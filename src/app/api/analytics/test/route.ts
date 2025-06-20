import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  console.log('🧪 Testing database connection...')
  
  try {
    const supabase = createRouteHandlerClient({ cookies })
    
    // Test 1: Check if we can connect to Supabase
    console.log('🔍 Testing Supabase connection...')
    const { data: testConnection, error: connectionError } = await supabase
      .from('analytics_events')
      .select('count', { count: 'exact', head: true })
    
    if (connectionError) {
      console.error('❌ Connection error:', connectionError)
      return NextResponse.json({ 
        error: 'Connection failed', 
        details: connectionError,
        step: 'connection_test'
      }, { status: 500 })
    }
    
    console.log('✅ Connection successful, table has', testConnection, 'rows')
    
    // Test 2: Try to insert a simple test record
    console.log('🔍 Testing insert...')
    const testEvent = {
      event_type: 'api_test',
      component_type: 'test',
      data: { test: true, timestamp: Date.now() },
      timestamp: new Date().toISOString()
    }
    
    const { data: insertData, error: insertError } = await supabase
      .from('analytics_events')
      .insert([testEvent])
      .select()
    
    if (insertError) {
      console.error('❌ Insert error:', insertError)
      return NextResponse.json({ 
        error: 'Insert failed', 
        details: insertError,
        step: 'insert_test'
      }, { status: 500 })
    }
    
    console.log('✅ Insert successful:', insertData)
    
    return NextResponse.json({ 
      success: true, 
      message: 'All tests passed!',
      insertedData: insertData
    })
    
  } catch (error) {
    console.error('❌ Test API error:', error)
    return NextResponse.json({ 
      error: 'Test failed', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 
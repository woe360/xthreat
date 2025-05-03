// src/app/api/modules/[module]/lessons/route.ts
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { module: string } }
) {
  try {
    // Access the dynamic route parameter directly
    const moduleSlug = params.module;
    console.log('Fetching lessons for module slug:', moduleSlug)
    
    if (!moduleSlug) {
      return NextResponse.json(
        { error: 'Module slug is required' },
        { status: 400 }
      )
    }
    
    // Create a direct Supabase client without cookies
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ 
        error: 'Missing Supabase credentials'
      }, { status: 500 })
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    // Try to get all modules first to check what's available
    console.log('Listing all modules to find match')
    const { data: allModules, error: listError } = await supabase
      .from('modules')
      .select('id, slug')
    
    if (listError) {
      console.error('Error listing modules:', listError)
    } else {
      console.log('Available modules:', allModules)
      
      // Try to find a case-insensitive match
      const foundModule = allModules.find(m => 
        m.slug.toLowerCase() === moduleSlug.toLowerCase())
      
      if (foundModule) {
        console.log('Found module with case-insensitive match. ID:', foundModule.id)
        
        // Fetch lessons for this module
        const { data, error } = await supabase
          .from('lessons')
          .select('*')
          .eq('module_id', foundModule.id)
          .order('lesson_order', { ascending: true })
          
        if (error) {
          console.error('Error fetching lessons for found module:', error)
        } else {
          console.log(`Found ${data?.length || 0} lessons for matched module`)
          return NextResponse.json(data || [])
        }
      }
    }
    
    // Regular flow as fallback
    const { data: moduleData, error: moduleError } = await supabase
      .from('modules')
      .select('id')
      .eq('slug', moduleSlug)
      .single()
    
    if (moduleError) {
      console.error('Error finding module by exact slug:', moduleError)
      
      // Try fallback to ID if the slug is numeric
      if (!isNaN(Number(moduleSlug))) {
        const moduleId = parseInt(moduleSlug)
        console.log('Trying to find lessons by module ID:', moduleId)
        
        // Fetch lessons for the module ID
        const { data, error } = await supabase
          .from('lessons')
          .select('*')
          .eq('module_id', moduleId)
          .order('lesson_order', { ascending: true })
        
        if (error) {
          console.error('Error fetching lessons by ID:', error)
        } else {
          console.log(`Found ${data?.length || 0} lessons for module ID ${moduleId}`)
          return NextResponse.json(data || [])
        }
      }
      
      // Return empty array instead of error to prevent client crashes
      console.log('No lessons found, returning empty array')
      return NextResponse.json([])
    }
    
    // Fetch lessons for the module
    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .eq('module_id', moduleData.id)
      .order('lesson_order', { ascending: true })
    
    if (error) {
      console.error('Error fetching lessons:', error)
      return NextResponse.json([]) // Return empty array instead of error
    }
    
    console.log(`Found ${data?.length || 0} lessons for module ${moduleData.id}`)
    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Error in lessons API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
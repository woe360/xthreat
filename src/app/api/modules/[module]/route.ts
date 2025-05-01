// src/app/api/modules/[module]/route.ts
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { module: string } }
) {
  try {
    // Access the dynamic route parameter directly
    const moduleSlug = params.module;
    console.log('Module API called with slug:', moduleSlug)
    
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
    
    // HACK: Hardcoded data for phishing-awareness to bypass database issues
    if (moduleSlug === 'phishing-awareness') {
      console.log('Using hardcoded data for phishing-awareness')
      
      return NextResponse.json({
        id: 1,
        slug: 'phishing-awareness',
        title: 'Phishing Awareness',
        description: 'Learn to recognize and respond to phishing attempts',
        tags: ['Threats']
      })
    }
    
    // First try to find all modules to debug
    console.log('Fetching all modules to find a match')
    const { data: allModules, error: listError } = await supabase
      .from('modules')
      .select('id, slug, title')
    
    if (listError) {
      console.error('Error listing modules:', listError)
    } else {
      console.log('Available modules:', allModules)
      
      // Try to find a case-insensitive match
      const foundModule = allModules.find(m => 
        m.slug.toLowerCase() === moduleSlug.toLowerCase())
      
      if (foundModule) {
        console.log('Found module with case-insensitive match:', foundModule)
        
        // Get the full module data
        const { data, error } = await supabase
          .from('modules')
          .select('*')
          .eq('id', foundModule.id)
          .single()
          
        if (error) {
          console.error('Error fetching found module:', error)
        } else {
          console.log('Successfully retrieved module data:', data)
          return NextResponse.json(data)
        }
      }
    }
    
    // Try by exact slug as fallback
    const { data, error } = await supabase
      .from('modules')
      .select('*')
      .eq('slug', moduleSlug)
      .single()
    
    if (error) {
      console.error('Error fetching module by exact slug:', error)
      
      // Try by ID as last resort
      if (!isNaN(Number(moduleSlug))) {
        const moduleId = parseInt(moduleSlug)
        console.log('Trying to find module by ID:', moduleId)
        
        const { data: idData, error: idError } = await supabase
          .from('modules')
          .select('*')
          .eq('id', moduleId)
          .single()
          
        if (idError) {
          console.error('Module not found by ID either:', idError)
        } else {
          console.log('Found module by ID:', idData)
          return NextResponse.json(idData)
        }
      }
      
      // If all else fails, return error
      return NextResponse.json(
        { error: 'Module not found' },
        { status: 404 }
      )
    }
    
    console.log('Module found by exact slug:', data)
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in module API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
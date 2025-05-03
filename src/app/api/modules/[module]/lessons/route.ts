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
        const { data: lessonsData, error: lessonsError } = await supabase
          .from('lessons')
          .select('*')
          .eq('module_id', foundModule.id)
          .order('lesson_order', { ascending: true })
          
        if (lessonsError) {
          console.error('Error fetching lessons for found module:', lessonsError)
        } else if (lessonsData) {
          console.log(`API: Found ${lessonsData.length} lessons for matched module. Raw lessons data:`, JSON.stringify(lessonsData, null, 2));
          // Get all lesson IDs for the module
          const lessonIds = lessonsData.map(l => l.id);

          // Fetch all sub-lessons for these lessons in one query
          const { data: subLessonsData, error: subLessonsError } = await supabase
            .from('sub_lessons')
            .select('id, title, slug, lesson_id, order_number')
            .in('lesson_id', lessonIds)
            .order('order_number', { ascending: true });

          if (subLessonsError) {
            console.error('API: Error fetching sub-lessons:', subLessonsError);
            // Proceed without sub-lessons if there's an error
          } else {
            console.log(`API: Found ${subLessonsData?.length || 0} sub-lessons for the module. Raw sub-lessons data:`, JSON.stringify(subLessonsData, null, 2));
            // Attach sub-lessons to their respective lessons
            const lessonsWithSubLessons = lessonsData.map(lesson => ({
              ...lesson,
              subLessons: subLessonsData?.filter(sub => sub.lesson_id === lesson.id) || []
            }));
            console.log('API: Returning lessons with attached sub-lessons:', JSON.stringify(lessonsWithSubLessons, null, 2));
            return NextResponse.json(lessonsWithSubLessons);
          }
          // Fallback: return lessons without sub-lessons if sub-lesson fetch failed
          console.log('API: Returning lessons WITHOUT sub-lessons due to fetch error or no data.');
          return NextResponse.json(lessonsData);
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
        const { data: lessonsDataById, error: lessonsErrorById } = await supabase
          .from('lessons')
          .select('*')
          .eq('module_id', moduleId)
          .order('lesson_order', { ascending: true })
        
        if (lessonsErrorById) {
          console.error('Error fetching lessons by ID:', lessonsErrorById)
        } else if (lessonsDataById) {
          console.log(`API: Found ${lessonsDataById.length} lessons for module ID ${moduleId}. Raw lessons data:`, JSON.stringify(lessonsDataById, null, 2));
          const lessonIds = lessonsDataById.map(l => l.id);

          // Fetch all sub-lessons for these lessons in one query
          const { data: subLessonsData, error: subLessonsError } = await supabase
            .from('sub_lessons')
            .select('id, title, slug, lesson_id, order_number')
            .in('lesson_id', lessonIds)
            .order('order_number', { ascending: true });

          if (subLessonsError) {
            console.error('API: Error fetching sub-lessons:', subLessonsError);
          } else {
            console.log(`API: Found ${subLessonsData?.length || 0} sub-lessons for the module. Raw sub-lessons data:`, JSON.stringify(subLessonsData, null, 2));
            const lessonsWithSubLessons = lessonsDataById.map(lesson => ({
              ...lesson,
              subLessons: subLessonsData?.filter(sub => sub.lesson_id === lesson.id) || []
            }));
            console.log('API: Returning lessons with attached sub-lessons:', JSON.stringify(lessonsWithSubLessons, null, 2));
            return NextResponse.json(lessonsWithSubLessons);
          }
          // Fallback: return lessons without sub-lessons if sub-lesson fetch failed
           console.log('API: Returning lessons WITHOUT sub-lessons due to fetch error or no data.');
          return NextResponse.json(lessonsDataById);
        }
      }
      
      // Return empty array instead of error to prevent client crashes
      console.log('No lessons found, returning empty array')
      return NextResponse.json([])
    }
    
    // Fetch lessons for the module
    const { data: lessonsDataExact, error: lessonsErrorExact } = await supabase
      .from('lessons')
      .select('*')
      .eq('module_id', moduleData.id)
      .order('lesson_order', { ascending: true })
    
    if (lessonsErrorExact) {
      console.error('Error fetching lessons:', lessonsErrorExact)
      return NextResponse.json([]) // Return empty array instead of error
    } else if (lessonsDataExact) {
      console.log(`API: Found ${lessonsDataExact.length} lessons for module ${moduleData.id}. Raw lessons data:`, JSON.stringify(lessonsDataExact, null, 2));
      const lessonIds = lessonsDataExact.map(l => l.id);

      // Fetch all sub-lessons for these lessons in one query
      const { data: subLessonsData, error: subLessonsError } = await supabase
        .from('sub_lessons')
        .select('id, title, slug, lesson_id, order_number')
        .in('lesson_id', lessonIds)
        .order('order_number', { ascending: true });

      if (subLessonsError) {
        console.error('API: Error fetching sub-lessons:', subLessonsError);
      } else {
        console.log(`API: Found ${subLessonsData?.length || 0} sub-lessons for the module. Raw sub-lessons data:`, JSON.stringify(subLessonsData, null, 2));
        const lessonsWithSubLessons = lessonsDataExact.map(lesson => ({
          ...lesson,
          subLessons: subLessonsData?.filter(sub => sub.lesson_id === lesson.id) || []
        }));
        console.log('API: Returning lessons with attached sub-lessons:', JSON.stringify(lessonsWithSubLessons, null, 2));
        return NextResponse.json(lessonsWithSubLessons);
      }
       // Fallback: return lessons without sub-lessons if sub-lesson fetch failed
      console.log('API: Returning lessons WITHOUT sub-lessons due to fetch error or no data.');
      return NextResponse.json(lessonsDataExact);
    }
    
    console.log(`No lessons found, returning empty array`)
    return NextResponse.json([]) // Default empty array
  } catch (error) {
    console.error('Error in lessons API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params: paramsPromise }: { params: Promise<{ module: string; lesson: string; sublesson: string }> }
) {
  try {
    const params = await paramsPromise;
    const moduleSlug = params.module;
    const lessonSlug = params.lesson;
    const subLessonSlug = params.sublesson;
    
    console.log(`Fetching sub-lesson: ${moduleSlug}/${lessonSlug}/${subLessonSlug}`);

    if (!moduleSlug || !lessonSlug || !subLessonSlug) {
      return NextResponse.json(
        { error: 'Missing module, lesson, or sub-lesson slug' },
        { status: 400 }
      )
    }

    // Create a direct Supabase client 
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ 
        error: 'Missing Supabase credentials'
      }, { status: 500 })
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Query to find the specific sub-lesson using slugs
    // We need to join modules -> lessons -> sub_lessons
    const { data: subLessonData, error: subLessonError } = await supabase
      .from('sub_lessons')
      .select(`
        *,
        lesson:lessons!inner (
          module:modules!inner (*)
        )
      `)
      .eq('slug', subLessonSlug) // Match sub-lesson slug
      .eq('lesson.slug', lessonSlug) // Match parent lesson slug
      .eq('lesson.module.slug', moduleSlug) // Match grandparent module slug
      .single(); // Expect only one result

    if (subLessonError) {
      console.error('Error fetching sub-lesson:', subLessonError);
      if (subLessonError.code === 'PGRST116') { // code for 'exact one row expected' but 0 found
         return NextResponse.json(
          { error: 'Sub-lesson not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { error: 'Failed to fetch sub-lesson', details: subLessonError.message },
        { status: 500 }
      );
    }

    if (!subLessonData) {
      return NextResponse.json(
        { error: 'Sub-lesson not found' },
        { status: 404 }
      );
    }

    // The query above includes nested lesson and module data.
    // We might only need the sub_lesson fields for the page.
    // Let's extract the core sub_lesson fields.
    const { lesson, ...coreSubLessonData } = subLessonData;

    // You might want to specifically select only the fields needed 
    // in the initial query for efficiency, e.g.:
    // .select('id, title, content_type, content, order_number, points, slug')

    console.log('Successfully fetched sub-lesson:', coreSubLessonData);
    return NextResponse.json(coreSubLessonData); // Return only the sub-lesson data

  } catch (error) {
    console.error('Error in sub-lesson API route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 
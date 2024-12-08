// src/app/api/modules/[module]/lessons/[lesson]/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET(
  request: Request,
  context: { params: Promise<{ module: string; lesson: string }> }
) {
  try {
    // Gauname params reikšmes su await
    const params = await context.params;
    const moduleSlug = params.module;
    const lessonSlug = params.lesson;

    if (!moduleSlug || !lessonSlug) {
      console.error('Missing parameters:', { moduleSlug, lessonSlug });
      return NextResponse.json(
        { error: 'Missing parameters' },
        { status: 400 }
      );
    }

    let moduleId: number;
    
    // Specialus atvejis "phishing-awareness" moduliui
    if (moduleSlug === 'phishing-awareness') {
      moduleId = 1;
    } else {
      moduleId = parseInt(moduleSlug);
    }

    const lessonId = parseInt(lessonSlug);

    // Fetch lesson data with sub_lessons (pašalintas completed laukas)
    const { data: lessonData, error: lessonError } = await supabase
      .from('lessons')
      .select(`
        *,
        sub_lessons (
          id,
          title,
          content,
          lesson_order
        )
      `)
      .eq('id', lessonId)
      .eq('module_id', moduleId)
      .single();

    if (lessonError) {
      console.error('Lesson fetch error:', lessonError);
      return NextResponse.json(
        { error: 'Failed to fetch lesson', details: lessonError.message },
        { status: 500 }
      );
    }

    if (!lessonData) {
      return NextResponse.json(
        { error: 'Lesson not found' },
        { status: 404 }
      );
    }

    // Get navigation data
    const { data: siblingLessons, error: siblingsError } = await supabase
      .from('lessons')
      .select('id, title, lesson_order')
      .eq('module_id', moduleId)
      .order('lesson_order', { ascending: true });

    if (siblingsError) {
      console.error('Siblings fetch error:', siblingsError);
      return NextResponse.json(lessonData);
    }

    // Find current lesson index
    const currentIndex = siblingLessons.findIndex(
      (l) => l.id === lessonId
    );

    // Construct response with navigation
    const enrichedData = {
      ...lessonData,
      sub_lessons: lessonData.sub_lessons?.sort(
        (a: { lesson_order: number }, b: { lesson_order: number }) => 
        a.lesson_order - b.lesson_order
      ) || [],
      navigation: {
        previous: currentIndex > 0 ? siblingLessons[currentIndex - 1] : null,
        next: currentIndex < siblingLessons.length - 1
          ? siblingLessons[currentIndex + 1]
          : null,
      },
    };

    return NextResponse.json(enrichedData);
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
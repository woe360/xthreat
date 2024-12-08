// src/app/api/modules/[module]/lessons/[lesson]/sublesson/[sublessons]/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET(
  request: Request,
  { params }: { 
    params: { 
      module: string; 
      lesson: string;
      sublesson: string;
    } 
  }
) {
  if (!params.module || !params.lesson || !params.sublesson) {
    return NextResponse.json(
      { error: 'Missing required parameters' },
      { status: 400 }
    );
  }

  try {
    const lessonId = parseInt(params.lesson);
    const sublessonId = parseInt(params.sublesson);

    if (isNaN(lessonId) || isNaN(sublessonId)) {
      return NextResponse.json(
        { error: 'Invalid ID format' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('sub_lessons')
      .select(`
        id,
        title,
        content,
        order,
        completed,
        quiz_questions (
          id,
          question_text,
          explanation,
          order_number,
          quiz_answers (
            id,
            answer_text,
            is_correct
          )
        )
      `)
      .eq('id', sublessonId)
      .eq('lesson_id', lessonId)
      .single();

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch sublesson' },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: 'Sublesson not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
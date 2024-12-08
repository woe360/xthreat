// src/app/api/quiz/[id]/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createRouteHandlerClient({ cookies });

  try {
    const { data, error } = await supabase
      .from('quiz_questions')
      .select(`
        id,
        question_text,
        explanation,
        order_number,
        quiz_answers (
          id,
          answer_text,
          is_correct
        )
      `)
      .eq('sub_lesson_id', params.id)
      .order('order_number');

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Error fetching quiz questions' }, { status: 500 });
  }
}
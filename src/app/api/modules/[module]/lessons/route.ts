// src/app/api/modules/[module]/lessons/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { module: string } }
) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  try {
    const { data: moduleData, error: moduleError } = await supabase
      .from('modules')
      .select('id')
      .eq('slug', params.module)
      .single();

    if (moduleError) {
      return NextResponse.json(
        { error: 'Module not found' },
        { status: 404 }
      );
    }

    const { data: lessonsData, error: lessonsError } = await supabase
      .from('lessons')
      .select('*')
      .eq('module_id', moduleData.id)
      .order('lesson_order', { ascending: true });

    if (lessonsError) {
      return NextResponse.json(
        { error: 'Failed to fetch lessons' },
        { status: 500 }
      );
    }

    return NextResponse.json(lessonsData);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
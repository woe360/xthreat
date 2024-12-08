// src/app/api/modules/[module]/lessons/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET(
  request: Request,
  { params }: { params: { module: string } }
) {
  try {
    // First get the module ID from the slug
    const { data: moduleData, error: moduleError } = await supabase
      .from('modules')
      .select('id')
      .eq('slug', params.module)
      .single();

    if (moduleError || !moduleData) {
      return NextResponse.json(
        { error: 'Module not found' },
        { status: 404 }
      );
    }

    // Then get the lessons using the module ID
    const { data, error } = await supabase
      .from('lessons')
      .select(`
        *,
        sub_lessons (*)
      `)
      .eq('module_id', moduleData.id)
      .order('lesson_order', { ascending: true });

    if (error) {
      console.error('Supabase error:', error); // Add logging
      return NextResponse.json(
        { error: 'Failed to fetch lessons' },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Server error:', error); // Add logging
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
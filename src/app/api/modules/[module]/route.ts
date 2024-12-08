// src/app/api/modules/[module]/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET(
  request: Request,
  { params }: { params: { module: string } }
) {
  try {
    const { data, error } = await supabase
      .from('modules')
      .select('*')
      .eq('slug', params.module) // Changed from 'id' to 'slug'
      .single();

    if (error) {
      console.error('Supabase error:', error); // Add logging
      return NextResponse.json(
        { error: 'Failed to fetch module' },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: 'Module not found' },
        { status: 404 }
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
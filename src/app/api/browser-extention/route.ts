// src/app/api/browser-extension/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {
  try {
    // Get random quiz question from your existing Supabase table
    const { data, error } = await supabase
      .from('quiz_questions')
      .select('*')
      .order('RANDOM()')
      .limit(1)
      .single()

    if (error) throw error
    
    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch quiz' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const { employeeId, questionId, answer, correct } = await req.json()
    
    const { data, error } = await supabase
      .from('quiz_responses')
      .insert([{
        employee_id: employeeId,
        question_id: questionId,
        answer,
        correct,
        source: 'extension'
      }])

    if (error) throw error
    
    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save response' }, { status: 500 })
  }
}
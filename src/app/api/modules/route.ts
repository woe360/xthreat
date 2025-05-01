import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    console.log('Fetching all modules from database')
    
    // Create a direct Supabase client without cookies
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    // Log the URLs we're connecting to (without the actual key)
    console.log('Connecting to Supabase URL:', supabaseUrl)
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase credentials')
      return NextResponse.json(
        { error: 'Missing Supabase credentials' },
        { status: 500 }
      )
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    // First, list all tables to debug
    console.log('Listing available tables...')
    const { data: tableList, error: tableError } = await supabase
      .from('modules')
      .select('*')
      .limit(1)
    
    if (tableError) {
      console.error('Error checking modules table:', tableError.message)
    } else {
      console.log('Modules table exists and has data')
    }
    
    // Now fetch all modules
    const { data, error } = await supabase
      .from('modules')
      .select('*')
    
    if (error) {
      console.error('Error fetching modules:', error)
      return NextResponse.json(
        { error: `Failed to fetch modules: ${error.message}` },
        { status: 500 }
      )
    }
    
    console.log(`Successfully found ${data?.length || 0} modules in database`)
    
    // Return the real data, no matter what
    return NextResponse.json(data || [])
    
  } catch (error) {
    console.error('Error in modules API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Helper function to get hardcoded modules
function getHardcodedModules() {
  return [
    {
      id: 1,
      title: "Phishing Awareness",
      description: "Learn how to identify and protect against phishing attacks, one of the most common threat vectors in modern cybersecurity.",
      slug: "phishing-awareness",
      tags: ["Threats", "Security Best Practices"],
      created_at: "2023-05-15T00:00:00Z",
      updated_at: "2023-05-15T00:00:00Z"
    },
    {
      id: 2,
      title: "Data Privacy Fundamentals",
      description: "Understand data privacy regulations, best practices for protecting sensitive information, and compliance requirements.",
      slug: "data-privacy",
      tags: ["Compliance & Regulations", "Security Best Practices"],
      created_at: "2023-05-20T00:00:00Z",
      updated_at: "2023-05-20T00:00:00Z"
    },
    {
      id: 3,
      title: "Secure Coding Practices",
      description: "Learn essential security principles for developers to write code that is resistant to common vulnerabilities.",
      slug: "secure-coding",
      tags: ["Security Best Practices", "Role-Based"],
      created_at: "2023-05-25T00:00:00Z",
      updated_at: "2023-05-25T00:00:00Z"
    },
    {
      id: 4,
      title: "Incident Response Fundamentals",
      description: "Develop the skills to effectively respond to and manage security incidents within your organization.",
      slug: "incident-response",
      tags: ["Incident Response", "Risk Management"],
      created_at: "2023-06-01T00:00:00Z",
      updated_at: "2023-06-01T00:00:00Z"
    },
    {
      id: 5,
      title: "Social Engineering Defense",
      description: "Recognize and mitigate social engineering attacks that target human psychology instead of technical vulnerabilities.",
      slug: "social-engineering",
      tags: ["Threats", "Security Best Practices"],
      created_at: "2023-06-05T00:00:00Z",
      updated_at: "2023-06-05T00:00:00Z"
    }
  ];
} 
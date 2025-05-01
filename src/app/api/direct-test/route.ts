import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

interface Diagnostics {
  connection?: string;
  error?: string | null;
  connectionError?: string;
  moduleCount?: number | string;
  module1?: any | null;
  module1Error?: string | null;
  allModules?: any[] | null;
  allModulesError?: string | null;
  phishingBySlug?: any | null;
  phishingSlugError?: string | null;
}

export async function GET() {
  try {
    console.log('Running detailed database diagnostics')
    
    // Create a direct Supabase client - URL and anon key should be in .env
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ 
        error: 'Missing Supabase credentials in environment variables',
        details: {
          url: !!supabaseUrl,
          key: !!supabaseKey
        }
      }, { status: 500 })
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey)
    const diagnostics: Diagnostics = {}
    
    // Try to connect and list tables
    try {
      console.log('Checking database connection...')
      const { data: healthData, error: healthError } = await supabase
        .from('modules')
        .select('count(*)', { count: 'exact', head: true })
      
      diagnostics.connection = healthError ? 'Failed' : 'Success'
      diagnostics.error = healthError ? healthError.message : null
      diagnostics.moduleCount = healthData ?? 'Unknown'
      
      console.log('Connection check:', diagnostics.connection)
    } catch (e) {
      diagnostics.connection = 'Error'
      diagnostics.connectionError = e instanceof Error ? e.message : String(e)
    }
    
    // Try to get module with ID 1
    try {
      console.log('Fetching module with ID 1...')
      const { data: module1, error: module1Error } = await supabase
        .from('modules')
        .select('*')
        .eq('id', 1)
        .single()
      
      diagnostics.module1 = module1Error ? null : module1
      diagnostics.module1Error = module1Error ? module1Error.message : null
      
      console.log('Module 1 fetch:', module1Error ? 'Failed' : 'Success')
    } catch (e) {
      diagnostics.module1Error = e instanceof Error ? e.message : String(e)
    }
    
    // Try to get ALL modules
    try {
      console.log('Fetching all modules...')
      const { data: allModules, error: allModulesError } = await supabase
        .from('modules')
        .select('id, title, slug')
      
      diagnostics.allModules = allModules
      diagnostics.moduleCount = allModules?.length ?? 0
      diagnostics.allModulesError = allModulesError ? allModulesError.message : null
      
      console.log(`All modules fetch: ${diagnostics.moduleCount} found`)
    } catch (e) {
      diagnostics.allModulesError = e instanceof Error ? e.message : String(e)
    }
    
    // Try to get phishing module by slug
    try {
      console.log('Fetching phishing module by slug...')
      const { data: phishingBySlug, error: phishingSlugError } = await supabase
        .from('modules')
        .select('*')
        .eq('slug', 'phishing-awareness')
        .single()
      
      diagnostics.phishingBySlug = phishingBySlug
      diagnostics.phishingSlugError = phishingSlugError ? phishingSlugError.message : null
      
      console.log('Phishing by slug:', phishingSlugError ? 'Failed' : 'Success')
    } catch (e) {
      diagnostics.phishingSlugError = e instanceof Error ? e.message : String(e)
    }
    
    // Return all diagnostic information
    return NextResponse.json({
      supabaseUrl,
      diagnostics,
      timestamp: new Date().toISOString(),
      message: "Database diagnostics completed"
    })
  } catch (error) {
    console.error('Error in diagnostics API:', error)
    return NextResponse.json({
      error: 'Internal server error during diagnostics',
      errorDetails: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
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
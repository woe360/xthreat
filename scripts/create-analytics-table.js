const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Load environment variables
require('dotenv').config()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables')
  console.error('Make sure you have NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your .env file')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function createAnalyticsTable() {
  try {
    console.log('Creating analytics_events table...')
    
    // Read the SQL file
    const sqlPath = path.join(__dirname, '..', 'migrations', 'create_analytics_events.sql')
    const sql = fs.readFileSync(sqlPath, 'utf8')
    
    // Execute the SQL
    const { data, error } = await supabase.rpc('exec_sql', { sql })
    
    if (error) {
      console.error('Error creating table:', error)
      return false
    }
    
    console.log('✅ Analytics table created successfully!')
    return true
    
  } catch (error) {
    console.error('Script error:', error)
    return false
  }
}

// Alternative method using individual queries if rpc doesn't work
async function createAnalyticsTableAlternative() {
  try {
    console.log('Creating analytics_events table (alternative method)...')
    
    // Create the table
    const { error: tableError } = await supabase.rpc('create_analytics_table')
    
    if (tableError) {
      console.log('RPC method failed, trying direct SQL execution...')
      
      // You'll need to run the SQL manually in Supabase dashboard
      console.log('\n📋 Please run this SQL in your Supabase SQL Editor:')
      console.log('=' * 60)
      
      const sqlPath = path.join(__dirname, '..', 'migrations', 'create_analytics_events.sql')
      const sql = fs.readFileSync(sqlPath, 'utf8')
      console.log(sql)
      
      console.log('=' * 60)
      console.log('\nAfter running the SQL, your analytics table will be ready!')
      return true
    }
    
    console.log('✅ Analytics table created successfully!')
    return true
    
  } catch (error) {
    console.error('Error:', error)
    console.log('\n📋 Please run the SQL manually in your Supabase SQL Editor.')
    return false
  }
}

// Run the script
async function main() {
  console.log('🚀 Setting up Analytics Table for XThreat...\n')
  
  const success = await createAnalyticsTable()
  
  if (!success) {
    console.log('\n⚠️  Automatic creation failed. Please run the SQL manually.')
    console.log('👉 Go to your Supabase dashboard > SQL Editor')
    console.log('👉 Copy and run the SQL from: migrations/create_analytics_events.sql')
  }
}

main() 
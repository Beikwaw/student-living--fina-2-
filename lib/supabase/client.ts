import { createClient } from '@supabase/supabase-js'
import { Database } from './types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()

if (!supabaseUrl) throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL')
if (!supabaseAnonKey) throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY')

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'x-application-name': 'student-living'
    }
  }
}) 
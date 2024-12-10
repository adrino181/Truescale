import { createClient } from '@supabase/supabase-js'

const NEXT_PUBLIC_SUPABASE_URL = 'https://ilpqzetrvihdzhwbgjkv.supabase.co';
const NEXT_PUBLIC_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlscHF6ZXRydmloZHpod2Jnamt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc5NzA1MTksImV4cCI6MTk5MzU0NjUxOX0.1MM_Xtxy8KWM5IUJPhuvieUIhqFvCS0IA84NVbqey2g';

export const supabase = createClient(
  NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY
)


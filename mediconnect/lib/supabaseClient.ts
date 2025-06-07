// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://cbnzenigtqzkqsircghg.supabase.co" 
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNibnplbmlndHF6a3FzaXJjZ2hnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3NTI4MTcsImV4cCI6MjA2MzMyODgxN30.f8-P1COuSn4NPDJKAU8V-c7CaU11vbfZpR_QLOJpBEo"
export const supabase = createClient(supabaseUrl, supabaseKey)

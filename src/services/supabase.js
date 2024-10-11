import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://yifaqbebanazzmjtewvo.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpZmFxYmViYW5henptanRld3ZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgxOTU4OTIsImV4cCI6MjAzMzc3MTg5Mn0.Cr5Nx57lXLgcIB9zS1yU34UxjzCP6kLXYmdICnFj8O0";
const supabase = createClient(supabaseUrl, supabaseKey);


// import { createClient } from '@supabase/supabase-js'
// const supabaseUrl = 'https://yifaqbebanazzmjtewvo.supabase.co'
// const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpZmFxYmViYW5henptanRld3ZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgxOTU4OTIsImV4cCI6MjAzMzc3MTg5Mn0.Cr5Nx57lXLgcIB9zS1yU34UxjzCP6kLXYmdICnFj8O0";
// const supabase = createClient(supabaseUrl, supabaseKey)


export default supabase;
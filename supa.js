import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kxcshzncfnlsfzaoiwhr.supabase.co";
const supabaseKey =
  " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4Y3Noem5jZm5sc2Z6YW9pd2hyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzIwODIyOTgsImV4cCI6MTk4NzY1ODI5OH0.6oNe4O_vN7eeZ5vtyFhg7gJ8u34QpwoF_CFggp6F8TA";

export const supabase = createClient(supabaseUrl, supabaseKey);

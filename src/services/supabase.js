import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://qwlcbpasxcaigunyvgkf.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3bGNicGFzeGNhaWd1bnl2Z2tmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTEyMjY1NTgsImV4cCI6MjAwNjgwMjU1OH0.6I4dbSfi1DPqgVWX8mOG-qu8rwxyoK_B9ytAJpo97sE';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

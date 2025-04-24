import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rskgcucbdjyovdcrcsmk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJza2djdWNiZGp5b3ZkY3Jjc21rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0OTk0NjEsImV4cCI6MjA2MTA3NTQ2MX0.pE97gsvoLlgFtmrofC67qXgTiysvB4U8az6GWCcJV3I';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

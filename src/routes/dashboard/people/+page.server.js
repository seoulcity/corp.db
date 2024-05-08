// src/routes/dashboard/people/+page.server.js
import { supabase } from '$lib/supabaseClient';

export async function load() {
  const { data } = await supabase.from('people').select();
  return {
    people: data ?? [],
  };
}
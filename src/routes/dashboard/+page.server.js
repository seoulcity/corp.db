// src/routes/dashboard/+page.server.js
import { redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';

export async function load({ cookies }) {
  const session = cookies.get('session');

  if (!session) {
    throw redirect(302, '/');
  }

  const { data } = await supabase.from('countries').select();
  return {
    countries: data ?? [],
  };
}
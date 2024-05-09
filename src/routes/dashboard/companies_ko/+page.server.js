// src/routes/dashboard/companies_ko/+page.server.js
import { supabase } from '$lib/supabaseClient';

export async function load({ params, fetch, url }) {
  const searchColumn = url.searchParams.get('searchColumn');
  const searchQuery = url.searchParams.get('searchQuery');

  let query = supabase.from('companies_ko').select('*').order('id');

  if (searchColumn && searchQuery) {
    query = query.ilike(searchColumn, `%${searchQuery}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching data from companies_ko table:', error);
    return {
      companies: [],
      error: 'Failed to fetch data from companies_ko table',
    };
  }

  return {
    companies: data || [],
    columns: data && data.length > 0 ? Object.keys(data[0]) : [],
  };
}
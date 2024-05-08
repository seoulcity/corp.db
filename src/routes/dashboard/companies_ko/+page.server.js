// src/routes/dashboard/companies_ko/+page.server.js
import { supabase } from '$lib/supabaseClient';

export async function load({ params, fetch }) {
  const { data, error } = await supabase
    .from('companies_ko')
    .select('*')
    .order('id');

  if (error) {
    console.error('Error fetching data from companies_ko table:', error);
    return {
      companies: [],
      error: 'Failed to fetch data from companies_ko table',
    };
  }

  return {
    companies: data || [], // 데이터가 없는 경우 빈 배열 반환
  };
}
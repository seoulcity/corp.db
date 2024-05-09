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

  // 컬럼 리스트를 별도로 가져오기
  const { data: columnData, error: columnError } = await supabase
    .from('companies_ko')
    .select('*')
    .limit(1);

  if (columnError) {
    console.error('Error fetching column data from companies_ko table:', columnError);
    return {
      companies: [],
      error: `관리자에게 문의하세요. 에러 내용: ${JSON.stringify(columnError)}`,
      searchColumn,
      searchQuery,
      columns: [],
    };
  }

  if (error) {
    console.error('Error fetching data from companies_ko table:', error);
    return {
      companies: [],
      error: `관리자에게 문의하세요. 에러 내용: ${JSON.stringify(error)}`,
      searchColumn,
      searchQuery,
      columns: columnData && columnData.length > 0 ? Object.keys(columnData[0]) : [],
    };
  }

  return {
    companies: data || [],
    columns: columnData && columnData.length > 0 ? Object.keys(columnData[0]) : [],
    searchColumn,
    searchQuery,
  };
}
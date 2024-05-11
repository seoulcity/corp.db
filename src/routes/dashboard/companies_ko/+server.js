// src/routes/dashboard/companies_ko/+server.js
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
  const { corpCode } = await request.json();

  try {
    const response = await fetch(`https://opendart.fss.or.kr/api/company.json?crtfc_key=${import.meta.env.VITE_OPENDART_API_KEY}&corp_code=${corpCode}`);
    const companyDetails = await response.json();
    return json(companyDetails);
  } catch (error) {
    console.error('Error fetching company details:', error);
    return json({ error: 'Failed to fetch company details' }, { status: 500 });
  }
}
// src/routes/dashboard/companies_ko/+server.js
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
  const { corpCode } = await request.json();

  try {
    const apiKey = import.meta.env.VITE_OPENDART_API_KEY;
    console.log('API Key:', apiKey);

    const response = await fetch(`https://opendart.fss.or.kr/api/company.json?crtfc_key=${apiKey}&corp_code=${corpCode}`);
    const companyDetails = await response.json();
    console.log('Company Details:', companyDetails);

    return json(companyDetails);
  } catch (error) {
    console.error('Error fetching company details:', error);
    return json({ error: 'Failed to fetch company details' }, { status: 500 });
  }
}
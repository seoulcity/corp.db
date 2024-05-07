// src/routes/+page.server.js
import { redirect } from '@sveltejs/kit';

export function load({ cookies }) {
  const session = cookies.get('session');

  if (session) {
    throw redirect(302, '/dashboard');
  }
}
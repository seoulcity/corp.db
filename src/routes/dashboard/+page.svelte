<!-- src/routes/dashboard/+page.svelte -->
<script>
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabaseClient';
  
	export let data;
  
	async function signOut() {
	  const { error } = await supabase.auth.signOut();
	  document.cookie = 'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'; // 세션 쿠키 삭제
	  goto('/');
	}
  </script>
  
  <div class="container mx-auto mt-8">
	<div class="flex justify-between items-center mb-8">
	  <h1 class="text-3xl font-bold">Dashboard</h1>
	  <button on:click={signOut} class="px-4 py-2 bg-red-500 text-white rounded">Sign Out</button>
	</div>
  
	<section>
	  <h2 class="text-2xl font-bold mb-4">Countries</h2>
	  <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
		{#each data.countries as country}
		  <li class="bg-white shadow rounded p-4">{country.name}</li>
		{/each}
	  </ul>
	</section>
  </div>
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

<h1 class="text-2xl text-center">Dashboard</h1>
<button on:click={signOut}>Sign Out</button>

<section class="mt-8">
	<h2 class="text-2xl font-bold mb-4">Countries</h2>
	<ul class="list-none">
		{#each data.countries as country}
			<li class="py-2">{country.name}</li>
		{/each}
	</ul>
</section>
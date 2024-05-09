<!-- src/routes/dashboard/+layout.svelte -->
<script>
	import { page } from '$app/stores';
	import { supabase } from '$lib/supabaseClient';

  async function signOut() {
	const { error } = await supabase.auth.signOut();
	if (!error) {
		document.cookie = 'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'; // 세션 쿠키 삭제
		window.location.href = '/'; // 페이지 리로딩
	}
}
</script>

<div class="flex">
	<nav class="w-48 bg-gray-200 min-h-screen p-4">
		<ul>
			<li><a href="/dashboard" class:active={$page.url.pathname === '/dashboard'}>Dashboard</a></li>
			<li>
				<a href="/dashboard/countries" class:active={$page.url.pathname === '/dashboard/countries'}
					>Countries</a
				>
			</li>
			<li>
				<a href="/dashboard/people" class:active={$page.url.pathname === '/dashboard/people'}
					>People</a
				>
			</li>
			<li>
				<a
					href="/dashboard/companies_ko"
					class:active={$page.url.pathname === '/dashboard/companies_ko'}>Companies_KO</a
				>
			</li>
			<!-- Add more navigation items as needed -->
		</ul>
		<button on:click={signOut} class='text-red-500'>Sign Out</button>
	</nav>

	<main class="flex-1 p-4">
		<slot />
	</main>
</div>

<style>
	.active {
		font-weight: bold;
		color: blue;
	}
</style>

<!-- src/routes/+page.svelte -->
<script>
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';
  
	let email = '';
	let password = '';
	let errorMessage = '';
  
	async function signInWithEmail() {
	  const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	  });
  
	  if (error) {
		errorMessage = error.message;
	  } else {
		document.cookie = `session=true; path=/; max-age=${60 * 60 * 24 * 7}`; // 쿠키 설정 (7일 동안 유지)
		goto('/dashboard');
	  }
	}
  
	onMount(() => {
	  email = '';
	  password = '';
	  errorMessage = '';
	});
  </script>
  
  <div class="container mx-auto mt-8">
	<h1 class="text-3xl font-bold mb-4 text-center">corp.reviews DB</h1>
  
	{#if errorMessage}
	  <p class="text-red-500 mb-4">{errorMessage}</p>
	{/if}
  
	<form on:submit|preventDefault={signInWithEmail} class="max-w-md mx-auto">
	  <div class="mb-4">
		<label for="email" class="block mb-2">Email</label>
		<input type="email" id="email" bind:value={email} class="w-full px-3 py-2 border rounded" required />
	  </div>
	  <div class="mb-4">
		<label for="password" class="block mb-2">Password</label>
		<input type="password" id="password" bind:value={password} class="w-full px-3 py-2 border rounded" required />
	  </div>
	  <button type="submit" class="w-full px-4 py-2 bg-blue-500 text-white rounded">Sign In</button>
	</form>
  </div>